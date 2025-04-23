import { Alert, Platform } from 'react-native';

// Cross-platform alert that works on both physical devices and Expo Snack
export const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
    if (Platform.OS === 'web') {
        if (buttons.length <= 2) {
            const isConfirm = buttons.length === 2;

            if (isConfirm) {
                const confirmResult = window.confirm(`${title}\n\n${message}`);

                if (confirmResult && buttons[1].onPress) {
                    buttons[1].onPress(); // Confirm
                } else if (!confirmResult && buttons[0].onPress) {
                    buttons[0].onPress(); // Cancel
                }
            } else {
                window.alert(`${title}\n\n${message}`);

                if (buttons[0].onPress) {
                    buttons[0].onPress();
                }
            }
        } else {
            window.alert(`${title}\n\n${message}`);
            const actionButton = buttons.find(button => button.style === 'destructive' || button.style === 'default');

            if (actionButton && actionButton.onPress) {
                actionButton.onPress();
            }
        }
    } else {
        Alert.alert(title, message, buttons); // Device-native alert
    }
};