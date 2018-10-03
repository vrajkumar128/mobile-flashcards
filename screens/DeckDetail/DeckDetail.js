import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';

class DeckDetail extends React.Component {
  // Set screen header to title of deck
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck;

    return ({
      title
    });
  }

  state = {
    deck: null
  }

  // Refresh the deck
  refreshDeck = async () => {
    const { title } = this.props.navigation.state.params.deck;
    const deck = await getDeck(title);
    this.setState({ deck });
  }

  // Initialize the deck's details
  componentDidMount() {
    this.refreshDeck();
  }

  // Reload the deck's details upon adding a card
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.refreshDeck();
    }
  }

  // Begin a quiz
  runQuiz = () => {
    const { deck } = this.state;

    clearLocalNotification()
      .then(setLocalNotification());

    this.props.navigation.navigate('Quiz', {
      deck,
      questionIndex: 0,
      numCorrect: 0
    });
  }

  render() {
    const { deck } = this.state;

    if (deck) {
      return (
        <View style={styles.container}>
          <View className="text" style={styles.subcontainer}>
            <Text style={styles.heading}>{deck.title}</Text>
            <Text style={styles.caption}>{deck.questions.length} {determineCardPlurality(deck)}</Text>
          </View>
          <View className="buttons" style={styles.subcontainer}>
            <TextButton 
              text="Add Card" 
              onPress={() => this.props.navigation.navigate('NewQuestion', { deck })} 
            />
            <TextButton 
              text="Start a Quiz"
              disabled={deck.questions.length === 0}
              onPress={this.runQuiz} 
            />
          </View>
        </View>
      );
    }

    return null;
    
  }
}

export default DeckDetail;