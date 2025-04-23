import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import styles from './styles';
import { saveQuestion, saveQuestionList } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

const NewQuestion = ({ route, navigation }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const questionInputRef = useRef(null);
  const answerInputRef = useRef(null);

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

  // Focus input on mount in web environment
  useEffect(() => {
    if (Platform.OS === 'web' && questionInputRef.current) {
      // Add a slight delay to ensure rendering is complete
      setTimeout(() => {
        try {
          questionInputRef.current.focus();
        } catch (e) {
          console.log('Error focusing input:', e);
        }
      }, 100);
    }
  }, []);

  // Save a new question or update an existing one
  const handleSubmit = async () => {
    let newDeck;

    if (editMode) {
      const updatedQuestions = [...deck.questions];

      updatedQuestions[questionIndex] = {
        question: questionText,
        answer: answerText
      };

      // Save the updated questions list
      newDeck = await saveQuestionList(deck.title, updatedQuestions);
    } else {
      newDeck = await saveQuestion(deck.title, questionText, answerText);
    }

    // Clear fields and navigate back
    setQuestionText('');
    setAnswerText('');
    navigation.navigate('DeckDetail', { deck: newDeck, deckId: newDeck.title });
  };

  // Handle focus change between fields
  const handleQuestionSubmit = () => {
    if (answerInputRef.current) {
      answerInputRef.current.focus();
    }
  };

  const Content = (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question:</Text>
        <TextInput
          ref={questionInputRef}
          placeholder="Enter question here"
          placeholderTextColor="#aaa"
          value={questionText}
          onChangeText={setQuestionText}
          style={styles.inputField}
          returnKeyType="next"
          onSubmitEditing={handleQuestionSubmit}
          autoFocus={Platform.OS === 'web'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Answer:</Text>
        <TextInput
          ref={answerInputRef}
          placeholder="Enter answer here"
          placeholderTextColor="#aaa"
          value={answerText}
          onChangeText={setAnswerText}
          style={styles.inputField}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
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

  // On native platforms, use TouchableWithoutFeedback to dismiss keyboard
  // On web, render content directly
  if (Platform.OS === 'web') {
    return Content;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {Content}
      </TouchableWithoutFeedback>
    );
  }
};

export default NewQuestion;