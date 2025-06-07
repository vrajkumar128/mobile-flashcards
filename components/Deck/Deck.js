import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import styles from './styles';

const Deck = ({
  deck,
  onPress,
  onLongPress,
  disabled = false,
  style,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    if (!disabled && onPress && !isPressed) {
      onPress();
    }
  };

  const handleLongPress = () => {
    if (!disabled && onLongPress) {
      onLongPress();
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        isPressed && !disabled && styles.containerPressed,
        disabled && styles.containerDisabled,
        style
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={disabled}
      delayLongPress={200}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.contents}>
        <Text style={[
          styles.title,
          isPressed && !disabled && styles.textPressed,
          disabled && styles.textDisabled
        ]}>
          {deck.title}
        </Text>
        <Text style={[
          styles.text,
          isPressed && !disabled && styles.textPressed,
          disabled && styles.textDisabled
        ]}>
          {deck.questions.length} {determineCardPlurality(deck)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Deck;