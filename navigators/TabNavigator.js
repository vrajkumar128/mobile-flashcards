import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from 'react-native-vector-icons';
import DeckList from '../screens/DeckList/DeckList';
import NewDeck from '../screens/NewDeck/NewDeck';
import { black, white } from '../utils/colors';

// Create tab navigator
const TabNavigator = (Platform.OS === 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator)({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    headers: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

export default TabNavigator;