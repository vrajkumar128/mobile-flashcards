import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';

const Quiz = ({ route, navigation }) => {
  const [showAns, setShowAns] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { deck } = route.params;

  // Set screen header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${deck.title} Quiz (${questionIndex + 1}/${deck.questions.length})`
    });
  }, [navigation, deck, questionIndex]);

  // Initialize state
  useEffect(() => {
    const initialQuestionIndex = route.params.questionIndex || 0;
    const initialNumCorrect = route.params.numCorrect || 0;

    setShowAns(false);
    setQuestionIndex(initialQuestionIndex);
    setNumCorrect(initialNumCorrect);

    if (initialQuestionIndex + 1 === deck.questions.length) {
      setIsLastQuestion(true);
    } else {
      setIsLastQuestion(false);
    }
  }, [route.params, deck.questions.length]);

  // Display the question or answer depending on state
  const questionOrAnswer = () => {
    return showAns
      ? deck.questions[questionIndex].answer
      : deck.questions[questionIndex].question;
  };

  // Show the answer
  const showAnswer = () => {
    setShowAns(prevState => !prevState);
  };

  // Display the next question
  const nextQuestion = (additionalCorrect = 0) => {
    const updatedCorrect = numCorrect + additionalCorrect;

    if (isLastQuestion) {
      navigation.navigate('Score', {
        deck,
        numCorrect: updatedCorrect
      });
    } else {
      navigation.navigate('Quiz', {
        deck,
        questionIndex: questionIndex + 1,
        numCorrect: updatedCorrect
      });
    }
  };

  // If the user's answer was correct, increment score and go to next question
  const isCorrect = () => {
    nextQuestion(1);
  };

  if (deck) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.subcontainer}>
            <Text style={styles.heading}>{questionOrAnswer()}</Text>
            <Text style={styles.caption} onPress={showAnswer}>
              {showAns ? "Show Question" : "Show Answer"}
            </Text>
          </View>
          <View style={styles.subcontainer}>
            <TextButton
              text="Correct"
              onPress={isCorrect}
            />
            <TextButton
              text="Incorrect"
              onPress={() => nextQuestion(0)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
};

export default Quiz;