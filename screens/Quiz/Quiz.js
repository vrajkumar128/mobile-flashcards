import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { getDeck } from '../../utils/api';

const Quiz = ({ route, navigation }) => {
  const [showAns, setShowAns] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const { deck } = route.params;
  const deckId = deck.title;

  const flipRotation = useSharedValue(0);

  const fisherYatesShuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchLatestDeck = async () => {
      if (route.params.randomizedQuestions && route.params.randomizedQuestions.length > 0) {
        setCurrentDeck(deck);
        setRandomizedQuestions(route.params.randomizedQuestions);
        setQuestionIndex(route.params.questionIndex || 0);
        setNumCorrect(route.params.numCorrect || 0);
        setMissedQuestions(route.params.missedQuestions || []);

        if ((route.params.questionIndex || 0) + 1 === route.params.randomizedQuestions.length) {
          setIsLastQuestion(true);
        } else {
          setIsLastQuestion(false);
        }

        return;
      }

      const latestDeck = await getDeck(deckId);
      setCurrentDeck(latestDeck);

      if (latestDeck) {
        const initialQuestionIndex = route.params.questionIndex || 0;
        const initialNumCorrect = route.params.numCorrect || 0;
        const initialMissedQuestions = route.params.missedQuestions || [];

        setShowAns(false);
        setQuestionIndex(initialQuestionIndex);
        setNumCorrect(initialNumCorrect);
        setMissedQuestions(initialMissedQuestions);

        if (initialQuestionIndex === 0 && !route.params.randomizedQuestions) {
          const shuffledQuestions = fisherYatesShuffle(latestDeck.questions);
          setRandomizedQuestions(shuffledQuestions);
        } else if (route.params.randomizedQuestions) {
          setRandomizedQuestions(route.params.randomizedQuestions);
        }

        if (initialQuestionIndex + 1 === latestDeck.questions.length) {
          setIsLastQuestion(true);
        } else {
          setIsLastQuestion(false);
        }
      }
    };

    fetchLatestDeck();
  }, [deckId, route.params]);

  useEffect(() => {
    flipRotation.value = 0;
    setShowAns(false);
  }, [questionIndex]);

  useLayoutEffect(() => {
    if (currentDeck && randomizedQuestions.length > 0) {
      navigation.setOptions({
        title: `${currentDeck.title} Quiz (${questionIndex + 1}/${randomizedQuestions.length})`
      });
    }
  }, [navigation, currentDeck, questionIndex, randomizedQuestions.length]);

  const handleCardFlip = () => {
    const newShowAns = !showAns;

    flipRotation.value = withTiming(newShowAns ? 180 : 0, { duration: 600 }, () => {
      runOnJS(setShowAns)(newShowAns);
    });
  };

  const getDynamicFontSize = (text) => {
    return 36;
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipRotation.value, [0, 180], [0, 180]);
    const opacity = interpolate(flipRotation.value, [0, 90, 180], [1, 0, 0]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      opacity,
      backfaceVisibility: 'hidden'
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipRotation.value, [0, 180], [180, 360]);
    const opacity = interpolate(flipRotation.value, [0, 90, 180], [0, 0, 1]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      opacity,
      backfaceVisibility: 'hidden'
    };
  });

  const nextQuestion = (additionalCorrect = 0) => {
    const updatedCorrect = numCorrect + additionalCorrect;

    const updatedMissedQuestions = [...missedQuestions];
    if (additionalCorrect === 0) {
      updatedMissedQuestions.push(randomizedQuestions[questionIndex]);
    }

    if (questionIndex + 1 === randomizedQuestions.length) {
      navigation.navigate('Score', {
        deck: currentDeck,
        numCorrect: updatedCorrect,
        missedQuestions: updatedMissedQuestions
      });
    } else {
      navigation.navigate('Quiz', {
        deck: currentDeck,
        questionIndex: questionIndex + 1,
        numCorrect: updatedCorrect,
        randomizedQuestions: randomizedQuestions,
        missedQuestions: updatedMissedQuestions
      });
    }
  };

  const isCorrect = () => {
    nextQuestion(1);
  };

  if (currentDeck && randomizedQuestions.length > 0) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.cardTouchable}
              onPress={handleCardFlip}
              activeOpacity={0.8}
            >
              <View style={styles.card}>
                <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
                  <ScrollView style={styles.cardTextContainer} contentContainerStyle={styles.cardTextContent}>
                    <Text style={[
                      styles.cardText,
                      { fontSize: randomizedQuestions[questionIndex] ? getDynamicFontSize(randomizedQuestions[questionIndex].question) : 22 }
                    ]}>
                      {randomizedQuestions[questionIndex]?.question}
                    </Text>
                  </ScrollView>
                  <Text style={styles.tapHint}>Tap to reveal answer</Text>
                </Animated.View>

                <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
                  <ScrollView style={styles.cardTextContainer} contentContainerStyle={styles.cardTextContent}>
                    <Text style={[
                      styles.cardText,
                      { fontSize: randomizedQuestions[questionIndex] ? getDynamicFontSize(randomizedQuestions[questionIndex].answer) : 22 }
                    ]}>
                      {randomizedQuestions[questionIndex]?.answer}
                    </Text>
                  </ScrollView>
                  <Text style={styles.tapHint}>Tap to show question</Text>
                </Animated.View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.iconButton, styles.incorrectButton]}
              onPress={() => nextQuestion(0)}
            >
              <Ionicons name="close" size={40} color="white" style={{ fontWeight: 'bold' }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, styles.correctButton]}
              onPress={isCorrect}
            >
              <Ionicons name="checkmark" size={40} color="white" style={{ fontWeight: 'bold' }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
};

export default Quiz;