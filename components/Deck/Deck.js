import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import styles from './styles';

const Deck = ({ deck, onDragStart, onDragEnd, onPress, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);
  const isDragging = useRef(false);

  // Combined handlers to support both visual feedback and drag functionality
  const handlePressIn = () => {
    setIsPressed(true);
    if (onDragStart) {
      isDragging.current = true;
      onDragStart();
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (onDragEnd && isDragging.current) {
      onDragEnd();
    }
    // Reset the dragging state
    isDragging.current = false;
  };

  // Only trigger press event if we're not dragging
  const handlePress = () => {
    if (!isDragging.current && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      key={deck.title}
      {...rest}
      style={[
        styles.container,
        isPressed && styles.containerPressed
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <View style={styles.contents}>
        <Text style={[
          styles.title,
          isPressed && styles.textPressed
        ]}>
          {deck.title}
        </Text>
        <Text style={[
          styles.text,
          isPressed && styles.textPressed
        ]}>
          {deck.questions.length} {determineCardPlurality(deck)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Deck;