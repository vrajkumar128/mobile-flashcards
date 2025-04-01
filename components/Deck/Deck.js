import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { determineCardPlurality } from '../../utils/helpers';
import { white, black } from '../../utils/colors';

// List deck names and # of cards in a given deck
const Deck = ({ deck, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      key={deck.title}
      {...rest}
      style={{
        width: '85%',
        alignItems: 'center',
        backgroundColor: isPressed ? black : white,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: black,
        cursor: 'pointer'
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={{
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
      }}>
        <Text style={{
          fontSize: 20,
          color: isPressed ? white : black
        }}>
          {deck.title}
        </Text>
        <Text style={{
          color: isPressed ? white : black
        }}>
          {deck.questions.length} {determineCardPlurality(deck)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Deck;