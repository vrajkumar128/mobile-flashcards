import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';

// Create stack navigator
const StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple
  //     }
  //   }
  // }
});

export default StackNavigator;