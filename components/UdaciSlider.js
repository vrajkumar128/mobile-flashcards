import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

const UdaciSlider = ({ max, unit, step, value, onValueChange }) => (
  <View style={styles.row}>
    <Slider
      style={{ flex: 1 }}
      step={step}
      value={value}
      maximumValue={max}
      minimumValue={0}
      onValueChange={onValueChange}
    />
    <View style={styles.metricCounter}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
      <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default UdaciSlider;
