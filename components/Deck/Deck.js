import React, { useState, useRef } from 'react';
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
  const longPressTriggered = useRef(false);

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
      longPressTriggered.current = false;
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
    // Reset the long press flag after a short delay
    setTimeout(() => {
      longPressTriggered.current = false;
    }, 100);
  };

  const handlePress = () => {
    // Only trigger press if we're not disabled and long press wasn't triggered
    if (!disabled && onPress && !longPressTriggered.current) {
      onPress();
    }
  };

  const handleLongPress = () => {
    if (!disabled && onLongPress) {
      longPressTriggered.current = true;
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