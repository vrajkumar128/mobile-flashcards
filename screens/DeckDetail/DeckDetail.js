import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getDeck } from '../../utils/api';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';

class DeckDetail extends React.PureComponent {
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

  // Retrieve the current deck's details
  async componentDidMount() {
    const { title } = this.props.navigation.state.params.deck;
    const deck = await getDeck(title);
    this.setState({ deck });
  }

  // Reload the component upon a change in questions
  async componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const { title } = this.props.navigation.state.params.deck;
      const deck = await getDeck(title);
      this.setState({ deck });
    }
  }

  // Begin a quiz
  runQuiz = () => {
    const { deck } = this.props.navigation.state.params;
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