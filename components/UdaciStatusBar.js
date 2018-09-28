import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

// Create styled status bar
const UdaciStatusBar = ({ backgroundColor, ...rest }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...rest} />
  </View>
);

export default UdaciStatusBar;