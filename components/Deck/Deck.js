import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

// Determine the plurality of the word "card"
determineCardPlurality = (deck) => (
  deck.questions.length === 1
    ? "card"
    : "cards"
);

// List deck names and # of cards in a given deck
const Deck = ({ deck }) => (
  <TouchableOpacity key={deck.title} style={styles.container}>
    <View className="contents" style={styles.contents}>
      <Text style={{ fontSize: 20 }}>{deck.title}</Text>
      <Text>{deck.questions.length} {determineCardPlurality(deck)}</Text>
    </View>
  </TouchableOpacity>
);

export default Deck;