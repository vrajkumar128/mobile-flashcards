import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';

class Score extends React.PureComponent {
  // Set screen header
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return ({
      title: `${deck.title} Quiz Score`
    });
  }

  render() {
    const { deck, numCorrect } = this.props.navigation.state.params;

    if (deck) {
      return (
        <View style={styles.container}>
          <View className="text" style={styles.subcontainer}>
            <Text style={styles.heading}>{`${100.0 * numCorrect / deck.questions.length}%`}</Text>
            <Text style={styles.caption}>{`You got ${numCorrect} / ${deck.questions.length} ${determineCardPlurality(deck)} correct!`}</Text>
          </View>
          <View className="buttons" style={styles.subcontainer}>
            <TextButton 
              text="Restart Quiz" 
              onPress={() => this.props.navigation.navigate('Quiz', {
                deck,
                questionIndex: 0,
                numCorrect: 0
              })} 
            />
            <TextButton 
              text="Back to Deck" 
              onPress={() => this.props.navigation.navigate('DeckDetail', {
                deck
              })} 
            />
          </View>
        </View>
      );
    }

    return null;
    
  }
}

export default Score;