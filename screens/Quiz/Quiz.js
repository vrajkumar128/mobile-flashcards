import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';
import { getDeck } from '../../utils/api'; // Import getDeck function

const Quiz = ({ route, navigation }) => {
  const [showAns, setShowAns] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);
  const { deck } = route.params;
  const deckId = deck.title;

  // Fisher-Yates shuffle for randomizing question order
  const fisherYatesShuffle = (array) => {
    const shuffled = [...array]; // Create a copy of the array

    // Start from the last element and swap with a random element before it (including itself)
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  // Fetch the latest deck data when component mounts
  useEffect(() => {
    const fetchLatestDeck = async () => {
      const latestDeck = await getDeck(deckId);
      setCurrentDeck(latestDeck);

      // Initialize with the latest deck's questions
      if (latestDeck) {
        const initialQuestionIndex = route.params.questionIndex || 0;
        const initialNumCorrect = route.params.numCorrect || 0;

        setShowAns(false);
        setQuestionIndex(initialQuestionIndex);
        setNumCorrect(initialNumCorrect);

        // Get randomized questions from route params or create a new shuffled array
        if (initialQuestionIndex === 0 && !route.params.randomizedQuestions) {
          // First time starting the quiz - randomize questions
          const shuffledQuestions = fisherYatesShuffle(latestDeck.questions);
          setRandomizedQuestions(shuffledQuestions);
        } else if (route.params.randomizedQuestions) {
          // Coming from a previous question - use the same shuffled order
          setRandomizedQuestions(route.params.randomizedQuestions);
        }

        // Check if this is the last question
        if (initialQuestionIndex + 1 === latestDeck.questions.length) {
          setIsLastQuestion(true);
        } else {
          setIsLastQuestion(false);
        }
      }
    };

    fetchLatestDeck();
  }, [deckId, route.params.questionIndex, route.params.numCorrect, route.params.randomizedQuestions]);

  // Set screen header
  useLayoutEffect(() => {
    if (currentDeck && randomizedQuestions.length > 0) {
      navigation.setOptions({
        title: `${currentDeck.title} Quiz (${questionIndex + 1}/${randomizedQuestions.length})`
      });
    }
  }, [navigation, currentDeck, questionIndex, randomizedQuestions.length]);

  // Display the question or answer depending on state
  const questionOrAnswer = () => {
    if (randomizedQuestions.length === 0) return '';

    return showAns
      ? randomizedQuestions[questionIndex].answer
      : randomizedQuestions[questionIndex].question;
  };

  // Toggle between showing question and answer
  const showAnswer = () => {
    setShowAns(prevState => !prevState);
  };

  // Navigate to the next question or to the score screen
  const nextQuestion = (additionalCorrect = 0) => {
    const updatedCorrect = numCorrect + additionalCorrect;

    if (questionIndex + 1 === randomizedQuestions.length) {
      // If this was the last question, go to the score screen
      navigation.navigate('Score', {
        deck: currentDeck,
        numCorrect: updatedCorrect
      });
    } else {
      // Otherwise go to the next question
      navigation.navigate('Quiz', {
        deck: currentDeck,
        questionIndex: questionIndex + 1,
        numCorrect: updatedCorrect,
        randomizedQuestions: randomizedQuestions
      });
    }
  };

  // If the user's answer was correct, increment score and go to next question
  const isCorrect = () => {
    nextQuestion(1);
  };

  if (currentDeck && randomizedQuestions.length > 0) {
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
              style={styles.correctButton}
            />
            <TextButton
              text="Incorrect"
              onPress={() => nextQuestion(0)}
              style={styles.incorrectButton}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
};

export default Quiz;