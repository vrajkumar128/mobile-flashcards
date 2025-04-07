import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatNewDeck, formatNewQuestion } from './helpers';
import { baseDecks } from './_DATA';

// AsyncStorage keys
const DECKS_STORAGE_KEY = 'vrrajkum-flashcards:decks';
const DECKS_ORDER_KEY = 'vrrajkum-flashcards:decksOrder';

// Retrieve decks from AsyncStorage
export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const orderJSON = await AsyncStorage.getItem(DECKS_ORDER_KEY);

    let decksObj;
    if (!decks) {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(baseDecks));
      decksObj = baseDecks;
    } else {
      decksObj = JSON.parse(decks);
    }

    // Set initial order if it doesn't exist
    let order = orderJSON ? JSON.parse(orderJSON) : Object.keys(decksObj);

    // Ensure any new decks are in the order array
    const allDeckNames = Object.keys(decksObj);
    const missingDecks = allDeckNames.filter(name => !order.includes(name));
    if (missingDecks.length > 0) {
      order = [...order, ...missingDecks];
      await AsyncStorage.setItem(DECKS_ORDER_KEY, JSON.stringify(order));
    }

    return { decks: decksObj, order };
  } catch (err) {
    console.error(err);
    alert('There was an error retrieving the list of decks. Please try reloading the app.');
  }
};

// Save deck order to AsyncStorage
export const saveDeckOrder = async (order) => {
  try {
    await AsyncStorage.setItem(DECKS_ORDER_KEY, JSON.stringify(order));
    return true;
  } catch (err) {
    console.error(err);
    alert('There was an error saving deck order. Please try again.');
    return false;
  }
};

// Retrieve a specific deck from AsyncStorage
export const getDeck = async (deckName) => {
  try {
    const { decks } = await getDecks();
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
    const { decks, order } = await getDecks();
    const updatedDecks = {
      ...decks,
      ...newDeck
    };

    // Add new deck to order array
    const updatedOrder = [...order, deckName];

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks));
    await AsyncStorage.setItem(DECKS_ORDER_KEY, JSON.stringify(updatedOrder));

    return newDeck;
  } catch (err) {
    console.error(err);
    alert('There was an error saving the deck. Please try again.');
  }
};

// Add a new question to the given deck in AsyncStorage
export const saveQuestion = async (deckName, questionText, answerText) => {
  try {
    const { decks } = await getDecks();
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
    const { decks, order } = await getDecks();

    if (!decks[deckName]) {
      return;
    }

    const { [deckName]: removed, ...remainingDecks } = decks;

    // Remove deck from order array
    const updatedOrder = order.filter(name => name !== deckName);

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(remainingDecks));
    await AsyncStorage.setItem(DECKS_ORDER_KEY, JSON.stringify(updatedOrder));

    return remainingDecks;
  } catch (err) {
    console.error(err);
    alert('There was an error deleting the deck. Please try again.');
  }
};

// Update the questions list for a deck
export const saveQuestionList = async (deckName, questions) => {
  try {
    const { decks } = await getDecks();

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