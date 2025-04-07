import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import { getDeck, removeDeck } from '../../utils/api';
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

  // Handle deck deletion
  const handleDeleteDeck = () => {
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete the "${deck.title}" deck?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await removeDeck(deck.title);
            navigation.navigate('Home');
          }
        }
      ],
      { cancelable: true }
    );
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
              text="Manage Cards"
              onPress={() => navigation.navigate('QuestionList', { deckId: deck.title })}
            />

            <TextButton
              text="Delete Deck"
              onPress={handleDeleteDeck}
              style={{ backgroundColor: '#ff3b30', borderColor: '#ff3b30' }}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default DeckDetail;