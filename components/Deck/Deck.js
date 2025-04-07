import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import styles from './styles';

// List deck names and # of cards in a given deck
const Deck = ({ deck, onDragStart, onDragEnd, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  // Combined handlers to support both visual feedback and drag functionality
  const handlePressIn = () => {
    setIsPressed(true);
    if (onDragStart) onDragStart();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (onDragEnd) onDragEnd();
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