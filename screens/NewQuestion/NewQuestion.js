import React, { useState, useLayoutEffect, useEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Text, View } from 'react-native';
import styles from './styles';
import { saveQuestion, saveQuestionList } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

const NewQuestion = ({ route, navigation }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  const { deck, editMode, questionIndex, questionText: initialQuestion, answerText: initialAnswer } = route.params || {};

  // Set screen header and initialize fields if in edit mode
  useLayoutEffect(() => {
    if (editMode) {
      navigation.setOptions({
        title: `Edit Card in ${deck.title}`
      });
    } else {
      navigation.setOptions({
        title: `Add Card to ${deck.title}`
      });
    }
  }, [navigation, deck, editMode]);

  // Initialize fields if in edit mode
  useEffect(() => {
    if (editMode && initialQuestion && initialAnswer) {
      setQuestionText(initialQuestion);
      setAnswerText(initialAnswer);
    }
  }, [editMode, initialQuestion, initialAnswer]);

  // Save a new question or update an existing one
  const handleSubmit = async () => {
    let newDeck;

    if (editMode) {
      // Update existing question
      const updatedQuestions = [...deck.questions];
      
      updatedQuestions[questionIndex] = {
        question: questionText,
        answer: answerText
      };

      // Save the updated questions list
      newDeck = await saveQuestionList(deck.title, updatedQuestions);
    } else {
      // Save a new question
      newDeck = await saveQuestion(deck.title, questionText, answerText);
    }

    // Clear fields and navigate back
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
        text={editMode ? "Save Changes" : "Add Card"}
        onPress={handleSubmit}
        style={styles.addButton}
      />
    </KeyboardAvoidingView>
  );
};

export default NewQuestion;