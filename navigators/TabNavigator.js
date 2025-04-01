import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from '../screens/DeckList/DeckList';
import NewDeck from '../screens/NewDeck/NewDeck';
import { black, white } from '../utils/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Platform.OS === 'ios' ? black : white,
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? white : black,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckList}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-bookmarks" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          tabBarLabel: 'New Deck',
          title: 'New Deck',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square" size={30} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;