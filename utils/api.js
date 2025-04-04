import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatNewDeck, formatNewQuestion } from './helpers';
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
    const decks = await getDecks();
    const updatedDecks = {
      ...decks,
      ...newDeck
    };
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks));
    return newDeck;
  } catch (err) {
    console.error(err);
    alert('There was an error saving the deck. Please try again.');
  }
};

// Add a new question to the given deck in AsyncStorage
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

// Remove a deck from AsyncStorage
export const removeDeck = async (deckName) => {
  try {
    const decks = await getDecks();

    if (!decks[deckName]) {
      return;
    }

    const { [deckName]: removed, ...remainingDecks } = decks;
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(remainingDecks));
    return remainingDecks;
  } catch (err) {
    console.error(err);
    alert('There was an error deleting the deck. Please try again.');
  }
};

// Update the questions list for a deck
export const saveQuestionList = async (deckName, questions) => {
  try {
    const decks = await getDecks();

    if (!decks[deckName]) {
      return;
    }

    decks[deckName].questions = questions;
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    return decks[deckName];
  } catch (err) {
    console.error(err);
    alert('There was an error updating the questions. Please try again.');
  }
};

// Save the current deck order to AsyncStorage
export const saveDecksOrder = async (decks) => {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
  } catch (err) {
    console.error(err);
    alert('There was an error saving the deck order. Please try again.');
  }
};