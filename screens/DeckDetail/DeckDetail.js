import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import { useFocusEffect } from '@react-navigation/native';

const DeckDetail = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { deckId } = route.params;

  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  useFocusEffect(
    useCallback(() => {
      refreshDeck();
      return () => { };
    }, [refreshDeck])
  );

  useLayoutEffect(() => {
    if (deck) {
      navigation.setOptions({
        title: deck.title
      });
    }
  }, [navigation, deck]);

  const runQuiz = () => {
    clearLocalNotification()
      .then(setLocalNotification);

    navigation.navigate('Quiz', {
      deck,
      questionIndex: 0,
      numCorrect: 0
    });
  };

  if (deck) {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View style={styles.groupedContainer}>
            <Text style={styles.heading}>{deck.title}</Text>
            <Text style={styles.caption}>{deck.questions.length} {determineCardPlurality(deck)}</Text>
          </View>

          <TextButton
            text="Start a Quiz"
            disabled={deck.questions.length === 0}
            onPress={runQuiz}
            style={deck.questions.length > 0 ? { backgroundColor: '#4cd964', borderColor: '#4cd964' } : {}}
          />

          <View style={styles.groupedContainer}>
            <TextButton
              text="Edit Deck"
              onPress={() => navigation.navigate('EditDeck', { deckId: deck.title })}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default DeckDetail;