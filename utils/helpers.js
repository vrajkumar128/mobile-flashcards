import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

// AsyncStorage key for local notifications
const NOTIFICATION_KEY = 'vrrajkum-flashcards:notifications';

// Given a deck name, return a deck object for saving to AsyncStorage
export const formatNewDeck = (deckName) => ({
  [deckName]: {
    title: deckName,
    questions: []
  }
});

// Given a question and answer, return a question object for pushing into a deck
export const formatNewQuestion = (question, answer) => ({
  question,
  answer
});

// Determine the plurality of the word "card"
export const determineCardPlurality = (deck) => (
  deck.questions.length === 1
    ? "card"
    : "cards"
);

// Clear notifications
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

// Define notification to be sent
function createNotification() {
  return {
    title: 'Take a Quiz!',
    body: "Remember to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

// Set notification in AsyncStorage
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) { // Check if notification has not already been set
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync(); // Prevent duplicate notifications

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              // Set time and frequency of notifications
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}