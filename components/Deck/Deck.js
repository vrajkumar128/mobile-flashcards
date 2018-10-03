import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import styles from './styles';

// List deck names and # of cards in a given deck
const Deck = ({ deck, ...rest }) => (
  <TouchableOpacity
    key={deck.title}
    {...rest}
    style={styles.container}
  >
    <View className="contents" style={styles.contents}>
      <Text style={{ fontSize: 20 }}>{deck.title}</Text>
      <Text>{deck.questions.length} {determineCardPlurality(deck)}</Text>
    </View>
  </TouchableOpacity>
);

export default Deck;