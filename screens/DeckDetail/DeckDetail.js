import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getDeck, removeDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const DeckDetail = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { deckId } = route.params;

  // Refresh the deck
  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  // Handle deck deletion - using useCallback
  const handleDeleteDeck = useCallback(() => {
    if (!deck) return;

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
  }, [deck, navigation]);

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

  // Refresh deck every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshDeck();
      return () => { };
    }, [refreshDeck])
  );

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
              text="Manage Cards"
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