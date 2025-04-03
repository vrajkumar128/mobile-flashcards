import React, { useState, useEffect } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { getDecks, removeDeck } from '../../utils/api';
import Deck from '../../components/Deck/Deck';
import styles from './styles';

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

  // Handle long press to show delete confirmation
  const handleLongPress = (deck) => {
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete the "${deck.title}" deck?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await removeDeck(deck.title);
            refreshDecks();
          }
        }
      ],
      { cancelable: true }
    );
  };

  if (decks) {
    const deckArray = Object.keys(decks).map(deckName => decks[deckName]);

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={deckArray}
          renderItem={({ item }) => (
            <Deck
              deck={item}
              onPress={() => handlePress(item)}
              onLongPress={() => handleLongPress(item)}
            />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }

  return null;
};

export default DeckList;