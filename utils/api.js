import { AsyncStorage } from 'react-native';
import { formatNewDeck, formatNewQuestion } from './helpers';
import { baseDecks } from './_DATA';

// AsyncStorage key for decks
const DECKS_STORAGE_KEY = 'vrrajkum-flashcards:decks';

// Retrieve decks from AsyncStorage
export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (!decks) {
      const initialDecks = await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(baseDecks));
      return initialDecks;
    }

    return JSON.parse(decks);
  } catch (err) {
    console.error(err);
    alert('There was an error retrieving the list of decks. Please try reloading the app.');
  }
};

// Retrieve a specific deck from AsyncStorage
export const getDeck = async (deckName) => {
  try {
    const decks = await getDecks();
    return decks[deckName];
  } catch (err) {
    console.error(err);
    alert('There was an error retrieving the details for this deck. Please try again.')
  }
};

// Save a new deck to AsyncStorage
export const saveDeck = async (deckName) => {
  try {
    const newDeck = formatNewDeck(deckName);
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
    return newDeck;
  } catch (err) {
    console.error(err);
    alert('There was an error saving the deck. Please try again.');
  }
};

// Merge a new question into the given deck in AsyncStorage
export const saveQuestion = async (deckName, questionText, answerText) => {
  try {
    const decks = await getDecks();
    const newQuestion = formatNewQuestion(questionText, answerText);
    decks[deckName].questions.push(newQuestion);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    return decks[deckName];
  } catch (err) {
    console.error(err);
    alert('There was an error saving the question. Please try again.');
  }
};