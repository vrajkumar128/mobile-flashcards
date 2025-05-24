import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';

const Score = ({ route, navigation }) => {
  const { deck, numCorrect } = route.params;

  // Set screen header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${deck.title} Quiz Score`
    });
  }, [navigation, deck]);

  if (deck) {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.heading}>{`${(100.0 * numCorrect / deck.questions.length).toFixed(0)}%`}</Text>
          <Text style={styles.caption}>{`You got ${numCorrect} / ${deck.questions.length} ${determineCardPlurality(deck)} correct!`}</Text>
        </View>
        <View style={styles.subcontainer}>
          <TextButton
            text="Restart Quiz"
            onPress={() => navigation.navigate('Quiz', {
              deck,
              questionIndex: 0,
              numCorrect: 0
            })}
          />
          <TextButton
            text="Home"
            onPress={() => navigation.navigate('Decks', {
              deck,
              deckId: deck.title
            })}
          />
        </View>
      </View>
    );
  }

  return null;
};

export default Score;