import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';

const DeckDetail = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { deckId } = route.params;

  // Set screen header to title of deck
  useLayoutEffect(() => {
    if (deck) {
      navigation.setOptions({
        title: deck.title
      });
    }
  }, [navigation, deck]);

  // Refresh the deck
  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  // Initialize the deck's details
  useEffect(() => {
    refreshDeck();
  }, [refreshDeck]);

  // Begin a quiz
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
          />

          <View style={styles.groupedContainer}>
            <TextButton
              text="Add Card"
              onPress={() => navigation.navigate('NewQuestion', { deck })}
            />

            <TextButton
              text="Remove Cards"
              disabled={deck.questions.length === 0}
              onPress={() => navigation.navigate('QuestionList', { deckId: deck.title })}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default DeckDetail;