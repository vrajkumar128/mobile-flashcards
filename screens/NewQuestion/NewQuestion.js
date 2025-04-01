import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Text, View } from 'react-native';
import styles from './styles';
import { saveQuestion } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

const NewQuestion = ({ route, navigation }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  const { deck } = route.params;

  // Set screen header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Add Card to ${deck.title}`
    });
  }, [navigation, deck]);

  // Save a new question, clear the input fields, and redirect to the respective DeckDetail
  const handleSubmit = async () => {
    const newDeck = await saveQuestion(deck.title, questionText, answerText);
    setQuestionText('');
    setAnswerText('');
    navigation.navigate('DeckDetail', { deck: newDeck, deckId: newDeck.title });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question:</Text>
        <TextInput
          placeholder="Enter question here"
          placeholderTextColor="#aaa"
          value={questionText}
          onChangeText={setQuestionText}
          style={styles.inputField}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Answer:</Text>
        <TextInput
          placeholder="Enter answer here"
          placeholderTextColor="#aaa"
          value={answerText}
          onChangeText={setAnswerText}
          style={styles.inputField}
        />
      </View>

      <TextButton
        disabled={!questionText || !answerText}
        text="Add Card"
        onPress={handleSubmit}
        style={styles.addButton}
      />
    </KeyboardAvoidingView>
  );
};

export default NewQuestion;