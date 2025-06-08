import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getDeck, removeDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { showAlert } from '../../utils/alertService'; // Import the new alert service

const DeckDetail = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { deckId } = route.params;

  // Refresh the deck
  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  // Refresh deck every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshDeck();
      return () => { };
    }, [refreshDeck])
    );

  // Set screen header to title of deck and add trash icon
  useLayoutEffect(() => {
    if (deck) {
      navigation.setOptions({
        title: deck.title,
        headerRight: () => (
          <TouchableOpacity onPress={handleDeleteDeck} style={{ marginRight: 15 }}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        )
      });
    }
  }, [navigation, deck, handleDeleteDeck]);

  // Handle deck deletion
  const handleDeleteDeck = useCallback(() => {
    if (!deck) return;

    showAlert(
      `Are you sure you want to delete the deck "${deck.title}"? This action cannot be undone.`,
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
            navigation.navigate('Decks');
          }
        }
      ]
    );
  }, [deck, navigation]);

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