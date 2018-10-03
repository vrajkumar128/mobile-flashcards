import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

// AsyncStorage key for local notifications
const NOTIFICATION_KEY = 'vrrajkum-flashcards:notifications';

// Given a deck name, create a deck object for saving to AsyncStorage
export const createNewDeck = (deckName) => ({
  [deckName]: {
    title: deckName,
    questions: []
  }
});

// Clear notifications
export const clearLocalNotifications = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
};

// Define the notification to be sent
const createNotification = () => ({
  title: 'Log your stats!',
  body: `Don't forget to log your stats for today!`,
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

// Set notification in AsyncStorage
export const setLocalNotification = async () => {
  // Check if notification has already been set
  const rawData = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const jsonData = JSON.parse(rawData);

  if (jsonData === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync(); // Prevent duplicate notifications
      let tomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);
      // Set time and frequency of notification
      Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
          time: tomorrow,
          repeat: 'day'
        }
      );
      
      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
};