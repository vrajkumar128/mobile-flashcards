import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getDecks, saveDeckOrder } from '../../utils/api';
import Deck from '../../components/Deck/Deck';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DraggableFlatList, { ScaleDecorator } from '../../components/DraggableFlatList';

const DeckList = ({ navigation }) => {
  const [decksData, setDecksData] = useState(null);
  const [deckArray, setDeckArray] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const refreshDecks = async () => {
    const result = await getDecks();
    if (result) {
      const { decks, order } = result;
      setDecksData(decks);

      const orderedDecks = order
        .filter(deckName => decks[deckName])
        .map(deckName => decks[deckName]);

      setDeckArray(orderedDecks);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshDecks();
      return () => { };
    }, [])
  );

  const handleDragEnd = async ({ data, from, to }) => {
    // Only update if the order actually changed
    if (from !== to) {
      console.log(`Moved deck from position ${from} to position ${to}`);

      // Update the local state with the new order
      setDeckArray(data);

      // Save the new order to storage
      const newOrder = data.map(deck => deck.title);
      await saveDeckOrder(newOrder);
    }

    // Reset dragging state after a short delay to ensure gesture is complete
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleDragBegin = (index) => {
    console.log(`Started dragging deck at index: ${index}`);
    setIsDragging(true);
  };

  const handlePress = (deck) => {
    // Only navigate if we're not currently dragging
    if (!isDragging) {
      navigation.navigate('DeckDetail', { deck, deckId: deck.title });
    }
  };

  const handleAddDeck = () => {
    navigation.navigate('NewDeck');
  };

  const renderItem = ({ item, drag, isActive, getIndex }) => {
    return (
      <ScaleDecorator>
        <Deck
          deck={item}
          onPress={() => handlePress(item)}
          onLongPress={drag}
          disabled={isActive}
          style={[
            isActive && {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              backgroundColor: '#f8f8f8',
            }
          ]}
        />
      </ScaleDecorator>
    );
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
    <View style={styles.container}>
      <DraggableFlatList
        data={deckArray}
        onDragEnd={handleDragEnd}
        onDragBegin={handleDragBegin}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={true}
        activationDistance={20}
        autoscrollThreshold={50}
        autoscrollSpeed={100}
        animationConfig={{
          damping: 20,
          mass: 0.2,
          stiffness: 100,
          overshootClamping: false,
          restSpeedThreshold: 0.2,
          restDisplacementThreshold: 0.2,
        }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddDeck}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DeckList;