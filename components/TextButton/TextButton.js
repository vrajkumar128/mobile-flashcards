import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const TextButton = ({ text, style = {}, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { disabled } = rest;

  // Create style arrays safely
  const buttonStyles = [styles.btn];
  if (isPressed && !disabled) buttonStyles.push(styles.btnPressed);
  if (disabled) buttonStyles.push(styles.btnDisabled);
  if (style) buttonStyles.push(style);

  const textStyles = [styles.btnText];
  if (isPressed && !disabled) textStyles.push(styles.btnTextPressed);
  if (disabled) textStyles.push(styles.btnTextDisabled);

  return (
    <TouchableOpacity
      {...rest}
      style={buttonStyles}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => !disabled && setIsPressed(false)}
    >
      <Text style={textStyles}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;