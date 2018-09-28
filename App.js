import React, { Component } from 'react';
import { View } from 'react-native';
import { setLocalNotification } from './utils/helpers';
import UdaciStatusBar from './components/UdaciStatusBar';
import StackNavigator from './navigators/StackNavigator';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification;
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor='#000' />
          <StackNavigator />
        </View>
    );
  }
}
