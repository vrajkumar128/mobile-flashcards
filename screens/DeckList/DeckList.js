import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDecks } from '../../utils/api';
import Deck from '../../components/Deck/Deck';
import styles from './styles';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const ITEM_HEIGHT = 100;
const DECKS_STORAGE_KEY = 'vrrajkum-flashcards:decks';

const DeckList = ({ navigation }) => {
  const [decks, setDecks] = useState(null);
  const [deckArray, setDeckArray] = useState([]);
  const [draggingIdx, setDraggingIdx] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;
  const scrollOffset = useRef(0);
  const flatListRef = useRef(null);

  // Refresh the list of decks
  const refreshDecks = async () => {
    const decksData = await getDecks();
    setDecks(decksData);

    if (decksData) {
      const array = Object.keys(decksData).map(deckName => decksData[deckName]);
      setDeckArray(array);
    }
  };

  // Initialize the deck list
  useEffect(() => {
    refreshDecks();
  }, []);

  // Display details for an individual deck when that deck is pressed
  const handlePress = (deck) => {
    if (!isDragging) {
      navigation.navigate('DeckDetail', { deck, deckId: deck.title });
    }
  };

  // Save the updated deck order
  const saveDecksOrder = async (updatedDecks) => {
    try {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks));
    } catch (error) {
      console.error('Error saving deck order:', error);
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event, index) => {
    if (event.nativeEvent.state === State.BEGAN) {
      setDraggingIdx(index);
      setIsDragging(true);
    } else if (event.nativeEvent.state === State.END) {

      // Only consider it a drag if moved more than 5 pixels
      const dragDistance = Math.abs(event.nativeEvent.translationY);

      if (dragDistance < 5) {
        setDraggingIdx(-1);
        setIsDragging(false);
        pan.setValue({ x: 0, y: 0 });
        return;
      }

      const position = scrollOffset.current + event.nativeEvent.translationY;

      const newIndex = Math.max(
        0,
        Math.min(
          Math.round(position / ITEM_HEIGHT),
          deckArray.length - 1
        )
      );

      if (newIndex !== draggingIdx && draggingIdx !== -1) {
        // Reorder the items
        const newArray = [...deckArray];
        const item = newArray.splice(draggingIdx, 1)[0];
        newArray.splice(newIndex, 0, item);

        // Update state
        setDeckArray(newArray);

        // Create updated decks object
        const updatedDecks = {};

        newArray.forEach(deck => {
          updatedDecks[deck.title] = deck;
        });

        // Save to AsyncStorage
        setDecks(updatedDecks);
        saveDecksOrder(updatedDecks);
      }

      // Reset
      setDraggingIdx(-1);
      pan.setValue({ x: 0, y: 0 });

      // Use a short timeout to prevent the press event from firing immediately after drag
      setTimeout(() => {
        setIsDragging(false);
      }, 200);
    }
  };

  const onScroll = (event) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
  };

  const renderItem = ({ item, index }) => {
    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={(event) => onHandlerStateChange(event, index)}
      >
        <Animated.View
          style={[
            index === draggingIdx && {
              transform: [{ translateY: pan.y }],
              zIndex: 1,
              elevation: 5
            }
          ]}
        >
          <Deck
            deck={item}
            onPress={() => handlePress(item)}
            isActive={index === draggingIdx}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  };

  if (decks) {
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={styles.listContainer}
          data={deckArray}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      </View>
    );
  }

  return null;
};

export default DeckList;