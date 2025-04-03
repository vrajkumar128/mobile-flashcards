import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const TextButton = ({ text, style = {}, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.btn,
        isPressed && styles.btnPressed,
        style
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={[
        styles.btnText,
        isPressed && styles.btnTextPressed
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;