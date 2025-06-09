import React from 'react';
import Constants from 'expo-constants';
import { View, StatusBar as RNStatusBar } from 'react-native';
import { darkBlue } from '../utils/colors';

const StatusBar = ({ backgroundColor = darkBlue, ...rest }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <RNStatusBar translucent backgroundColor={backgroundColor} {...rest} />
  </View>
);

export default StatusBar;