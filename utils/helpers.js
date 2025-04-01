import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
let Device;
try {
  Device = require('expo-device');
} catch (e) {
  Device = {
    isDevice: true
  };
}

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
export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync();
}

// Configure notification behavior
async function configureNotifications() {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// Set notification in AsyncStorage
export async function setLocalNotification() {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_KEY);
    const parsedData = JSON.parse(data);

    if (parsedData === null) {
      // Configure notifications handler
      await configureNotifications();

      // Check if the device can receive notifications
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus === 'granted') {
          // Cancel any existing notifications to prevent duplicates
          await Notifications.cancelAllScheduledNotificationsAsync();

          // Schedule notification for tomorrow at 8 PM
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);
          tomorrow.setSeconds(0);

          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Take a Quiz!',
              body: "Remember to take a quiz today!",
              sound: true,
            },
            trigger: {
              hour: 20,
              minute: 0,
              repeats: true,
            },
          });

          await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      }
    }
  } catch (error) {
    console.log('Error setting up notification:', error);
  }
}