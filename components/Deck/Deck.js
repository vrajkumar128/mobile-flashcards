import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import styles from './styles';

// List deck names and # of cards in a given deck
const Deck = ({ deck, onLongPress, delayLongPress = 500, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      key={deck.title}
      onLongPress={() => {
        console.log('Long press triggered');
        if (onLongPress) onLongPress();
      }}
      delayLongPress={delayLongPress}
      {...rest}
      style={[
        styles.container,
        isPressed && styles.containerPressed
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
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