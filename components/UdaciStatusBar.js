import React from 'react';
import Constants from 'expo-constants';
import { View, StatusBar } from 'react-native';
import { darkBlue } from '../utils/colors';

// Styled status bar
const UdaciStatusBar = ({ backgroundColor = darkBlue, ...rest }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...rest} />
  </View>
);

export default UdaciStatusBar;