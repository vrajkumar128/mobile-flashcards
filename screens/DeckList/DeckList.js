import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getDecks, saveDeckOrder } from '../../utils/api';
import Deck from '../../components/Deck/Deck';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const DECK_HEIGHT = 100;

const DeckList = ({ navigation }) => {
  const [decksData, setDecksData] = useState(null);
  const [deckArray, setDeckArray] = useState([]);
  const [isDraggingActive, setIsDraggingActive] = useState(false);

  // Refresh the list of decks
  const refreshDecks = async () => {
    const result = await getDecks();
    if (result) {
      const { decks, order } = result;
      setDecksData(decks);

      // Create array of decks in the saved order
      const orderedDecks = order
        .filter(deckName => decks[deckName])
        .map(deckName => decks[deckName]);

      setDeckArray(orderedDecks);
    }
  };

  // Refresh decks every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshDecks();
      return () => { };
    }, [])
  );

  // Initialize the deck list
  useEffect(() => {
    refreshDecks();
  }, []);

  // Handle saving the new deck order
  const handleReordered = async (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    // Create a copy of the current array to reorder
    const updatedDeckArray = [...deckArray];

    // Move the deck from old position to new position
    const [movedDeck] = updatedDeckArray.splice(fromIndex, 1);
    updatedDeckArray.splice(toIndex, 0, movedDeck);

    // Update the state with the new order
    setDeckArray(updatedDeckArray);

    // Save the new order to AsyncStorage
    const newOrder = updatedDeckArray.map(deck => deck.title);
    await saveDeckOrder(newOrder);
  };

  // Display details for an individual deck when that deck is pressed
  const handlePress = (deck) => {
    if (!isDraggingActive) {
      navigation.navigate('DeckDetail', { deck, deckId: deck.title });
    }
  };

  const handleDragStart = () => {
    setIsDraggingActive(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      setIsDraggingActive(false);
    }, 100);
  };

  const handleAddDeck = () => {
    navigation.navigate('NewDeck');
  };

  if (!decksData || deckArray.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddDeck}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <DraggableList
          data={deckArray}
          itemHeight={DECK_HEIGHT}
          onDragEnd={handleReordered}
          onDragStart={handleDragStart}
          onDragComplete={handleDragEnd}
          renderItem={(item, index, isDragging) => (
            <Deck
              deck={item}
              onPress={() => handlePress(item)}
              disabled={isDragging || isDraggingActive}
            />
          )}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddDeck}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const DraggableList = ({
  data,
  renderItem,
  itemHeight,
  onDragEnd,
  onDragStart,
  onDragComplete
}) => {
  const activeItemIndex = useSharedValue(-1); // Track which item is being dragged
  const startY = useSharedValue(0); // Track the starting y position when drag begins
  const currentY = useSharedValue(0); // Track current y position while dragging
  const itemPositions = useSharedValue(  // Track final y position for each item
    data.map((_, index) => index * itemHeight)
  );

  // Update positions when data changes
  useEffect(() => {
    itemPositions.value = data.map((_, index) => index * itemHeight);
  }, [data, itemHeight]);

  // Handle drag completion and reordering
  const handleDragEnd = (from, to) => {
    if (from !== to) {
      onDragEnd(from, to);
    }

    if (onDragComplete) {
      onDragComplete();
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <DraggableItem
          key={item.title}
          item={item}
          index={index}
          renderItem={renderItem}
          itemHeight={itemHeight}
          itemCount={data.length}
          activeItemIndex={activeItemIndex}
          startY={startY}
          currentY={currentY}
          itemPositions={itemPositions}
          onDragEnd={handleDragEnd}
          onDragStart={onDragStart}
        />
      ))}
    </>
  );
};

// Individual draggable item component
const DraggableItem = ({
  item,
  index,
  renderItem,
  itemHeight,
  itemCount,
  activeItemIndex,
  startY,
  currentY,
  itemPositions,
  onDragEnd,
  onDragStart
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Calculate position of this item
  const animatedPosition = useAnimatedStyle(() => {
    const isActive = activeItemIndex.value === index; // Check if this is the active item being dragged

    // If dragging state changes, update the React state
    if (isActive !== isDragging) {
      runOnJS(setIsDragging)(isActive);
    }

    const basePosition = index * itemHeight; // Starting position based on index

    // If this is the active item, it follows the finger
    if (isActive) {
      return {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: currentY.value }],
      };
    }

    // Other items need to move based on active item position
    if (activeItemIndex.value !== -1) {
      const activePosition = currentY.value; // Calculate where active item is currently positioned
      const activeSlot = Math.round(activePosition / itemHeight); // Calculate which slot it's currently over
      const targetSlot = Math.max(0, Math.min(activeSlot, itemCount - 1)); // Constrain to valid indices

      // Move items out of the way
      if (activeItemIndex.value !== -1) {
        // If dragging down and current item is between original position and target
        if (index > activeItemIndex.value && index <= targetSlot) {
          // Move up to make room
          return {
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: withTiming(basePosition - itemHeight, { duration: 250 }) }],
          };
        }

        // If dragging up and current item is between target and original position
        if (index < activeItemIndex.value && index >= targetSlot) {
          // Move down to make room
          return {
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: withTiming(basePosition + itemHeight, { duration: 250 }) }],
          };
        }
      }
    }

    // Default position for items not affected
    return {
      zIndex: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transform: [{ translateY: withTiming(basePosition, { duration: 250 }) }],
    };
  });

  // Gesture handling
  const panGesture = Gesture.Pan()
    .onStart(() => {
      activeItemIndex.value = index;
      startY.value = index * itemHeight;
      currentY.value = index * itemHeight;

      // Signal drag start to parent
      if (onDragStart) {
        runOnJS(onDragStart)();
      }
    })
    .onUpdate((e) => { // Update position based on gesture
      currentY.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      const finalPosition = currentY.value; // Calculate which slot the item should go to
      const finalSlot = Math.round(finalPosition / itemHeight);
      const targetIndex = Math.max(0, Math.min(finalSlot, itemCount - 1)); // Constrain to valid indices

      currentY.value = withTiming(targetIndex * itemHeight, {
        duration: 250
      });

      // Notify parent of any reordering
      if (targetIndex !== index) {
        runOnJS(onDragEnd)(index, targetIndex);
      } else {
        runOnJS(onDragEnd)(index, index);
      }

      // Reset active item
      activeItemIndex.value = -1;
    });

  // Animated styles for visual feedback
  const animatedItemStyle = useAnimatedStyle(() => {
    const isActive = activeItemIndex.value === index;

    if (isActive) {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: withTiming(0.2, { duration: 150 }),
        shadowRadius: withTiming(5, { duration: 150 }),
        elevation: withTiming(5, { duration: 150 }),
        backgroundColor: withTiming('#f8f8f8', { duration: 150 }),
        transform: [{ scale: withTiming(1.03, { duration: 150 }) }],
      };
    }

    return {
      shadowOpacity: withTiming(0, { duration: 150 }),
      elevation: withTiming(0, { duration: 150 }),
      backgroundColor: withTiming('transparent', { duration: 150 }),
      transform: [{ scale: withTiming(1, { duration: 150 }) }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedPosition}>
        <Animated.View style={[{ height: itemHeight }, animatedItemStyle]}>
          {renderItem(item, index, isDragging)}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default DeckList;