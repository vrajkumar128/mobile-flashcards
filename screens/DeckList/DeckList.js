import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import Deck from '../../components/Deck/Deck';

const DeckList = ({ navigation }) => {
  const [decks, setDecks] = useState(null);

  // Refresh the list of decks
  const refreshDecks = async () => {
    const decksData = await getDecks();
    setDecks(decksData);
  };

  // Initialize the deck list
  useEffect(() => {
    refreshDecks();
  }, []);

  // Display details for an individual deck when that deck is pressed
  const handlePress = (deck) => {
    navigation.navigate('DeckDetail', { deck, deckId: deck.title });
  };

  if (decks) {
    const deckArray = Object.keys(decks).map(deckName => decks[deckName]); // Format decks for <FlatList /> component

    return (
      <FlatList
        data={deckArray}
        renderItem={({ item }) => <Deck deck={item} onPress={() => handlePress(item)} />}
        keyExtractor={item => item.title}
      />
    );
  }

  return null;
};

export default DeckList;