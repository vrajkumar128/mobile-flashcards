import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const TextButton = ({ text, ...rest }) => (
  <TouchableOpacity {...rest} style={styles.btn}>
    <Text style={{ fontSize: 18 }}>{text}</Text>
  </TouchableOpacity>
);

export default TextButton;