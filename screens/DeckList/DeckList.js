import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { getDecks, saveDeckOrder } from '../../utils/api';
import Deck from '../../components/Deck/Deck';
import styles from './styles';
import DragList from 'react-native-draglist';
import { useFocusEffect } from '@react-navigation/native';

const DeckList = ({ navigation }) => {
  const [decksData, setDecksData] = useState(null);
  const [deckArray, setDeckArray] = useState([]);

  // Refresh the list of decks
  const refreshDecks = async () => {
    const result = await getDecks();
    if (result) {
      const { decks, order } = result;
      setDecksData(decks);

      // Create array of decks in the saved order
      const orderedDecks = order
        .filter(deckName => decks[deckName]) // Filter out any deck names that no longer exist
        .map(deckName => decks[deckName]);

      setDeckArray(orderedDecks);
    }
  };

  // Refresh decks every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshDecks();
      return () => { }; // Cleanup function if needed
    }, [])
  );

  // Initialize the deck list
  useEffect(() => {
    refreshDecks();
  }, []);

  // Display details for an individual deck when that deck is pressed
  const handlePress = (deck) => {
    navigation.navigate('DeckDetail', { deck, deckId: deck.title });
  };

  // Handle reordering of decks
  const handleReordered = async (fromIndex, toIndex) => {
    const updatedDeckArray = [...deckArray];
    const movedItem = updatedDeckArray.splice(fromIndex, 1)[0];
    updatedDeckArray.splice(toIndex, 0, movedItem);
    setDeckArray(updatedDeckArray);

    // Save the new order to AsyncStorage
    const newOrder = updatedDeckArray.map(deck => deck.title);
    await saveDeckOrder(newOrder);
  };

  // Render individual deck components
  const renderDeck = (info) => {
    const { item, onDragStart, onDragEnd } = info;
    return (
      <Deck
        deck={item}
        onPress={() => handlePress(item)}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    );
  };

  if (decksData) {
    return (
      <View style={styles.container}>
        <DragList
          data={deckArray}
          keyExtractor={item => item.title}
          renderItem={renderDeck}
          onReordered={handleReordered}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  }

  return null;
};

export default DeckList;