import { AsyncStorage } from 'react-native';
import { createNewDeck } from './helpers';
import { baseDecks } from './_DATA';

// AsyncStorage key for decks
const DECKS_STORAGE_KEY = 'vrrajkum-flashcards:decks';

// Retrieve decks from AsyncStorage
export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (!decks) {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(baseDecks));
      return baseDecks;
    }

    return JSON.parse(decks);
  } catch (err) {
    console.error(err);
    alert('Error retrieving deck list');
  }
}

// Save a new deck to AsyncStorage
export const saveDeck = async (deckName) => {
  try {
    const newDeck = createNewDeck(deckName);
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
  } catch (err) {
    console.error(err);
    alert('There was an error saving the deck. Please try again.');
  }
}