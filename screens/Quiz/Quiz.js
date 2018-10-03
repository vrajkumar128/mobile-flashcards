import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';

class Quiz extends React.PureComponent {
  // Set screen header
  static navigationOptions = ({ navigation }) => {
    const { deck, questionIndex } = navigation.state.params;

    return ({
      title: `${deck.title} Quiz (${questionIndex + 1}/${deck.questions.length})`
    });
  }

  state = {
    numCorrect: 0,
    showAns: false,
    isLastQuestion: false
  }

  // Reset state
  componentDidMount() {
    const { deck, questionIndex, numCorrect } = this.props.navigation.state.params;

    this.setState({
      showAns: false,
      questionIndex,
      numCorrect,
      isLastQuestion: false
    });

    if (questionIndex + 1 === deck.questions.length) {
      this.setState({
        isLastQuestion: true,
      });
    }
  }

  // Refresh component for each subsequent question
  componentDidUpdate(prevProps) {
    const { deck, questionIndex, numCorrect } = this.props.navigation.state.params;

    if (prevProps !== this.props) {
      this.setState({
        showAns: false,
        questionIndex,
        numCorrect,
        isLastQuestion: false
      });
  
      if (questionIndex + 1 === deck.questions.length) {
        this.setState({
          isLastQuestion: true,
        });
      }
    }
  }

  // Display the question or answer depending on state
  questionOrAnswer = () => {
    const { deck, questionIndex } = this.props.navigation.state.params;
    const { showAns } = this.state;

    return showAns
      ? deck.questions[questionIndex].answer
      : deck.questions[questionIndex].question
  }

  // Show the answer
  showAnswer = () => {
    this.setState(currentState => ({
      showAns: !currentState.showAns
    }));
  }

  // Display the next question
  nextQuestion = () => {
    const { deck, questionIndex } = this.props.navigation.state.params;
    const { isLastQuestion, numCorrect} = this.state;

    if (isLastQuestion) {
      this.props.navigation.navigate('Score', {
        deck,
        numCorrect
      });
    } else {
      this.props.navigation.navigate('Quiz', {
        deck,
        questionIndex: questionIndex + 1,
        numCorrect
      });
    }
  }

  // If the user's answer was correct, increment one to the score and then go to the next question
  isCorrect = () => {
    this.setState(currentState => ({
      numCorrect: currentState.numCorrect + 1
    }), () => this.nextQuestion());
  }

  render() {
    const { deck } = this.props.navigation.state.params;

    if (deck) {
      return (
        <View style={styles.container}>
          <View className="text" style={styles.subcontainer}>
            <Text style={styles.heading}>{this.questionOrAnswer()}</Text>
            <Text style={styles.caption} onPress={this.showAnswer}>Show Answer</Text>
          </View>
          <View className="buttons" style={styles.subcontainer}>
            <TextButton 
              text="Correct" 
              onPress={this.isCorrect} 
            />
            <TextButton 
              text="Incorrect" 
              onPress={this.nextQuestion} 
            />
          </View>
        </View>
      );
    }

    return null;
    
  }
}

export default Quiz;