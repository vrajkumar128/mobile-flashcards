import React, { useEffect } from 'react';
import { View } from 'react-native';
import { setLocalNotification } from './utils/helpers';
import StatusBar from './components/StatusBar';
import MainNavigator from './navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}