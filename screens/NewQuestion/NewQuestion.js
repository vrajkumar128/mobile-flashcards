import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, TextInput, Text } from 'react-native';
import styles from './styles';
import { saveQuestion } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

class NewDeck extends PureComponent {
  // Set screen header
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    
    return ({
      title: `Add Card to ${deck.title}`
    });
  }

  state = { 
    questionText: '',
    answerText: '',
  }

  // Save a new question, clear the input fields, and redirect to the respective DeckDetail
  handleSubmit = async () => {
    const { questionText, answerText } = this.state;
    const { deck } = this.props.navigation.state.params;
    await saveQuestion(deck.title, questionText, answerText);
    this.setState({ questionText: '', answerText: '' });
    this.props.navigation.pop();
  }

  render() {
    const { questionText, answerText } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput 
          placeholder="Question" 
          value={questionText} 
          onChangeText={questionText => this.setState({ questionText })}
          style={styles.inputField}
        />
        <TextInput 
          placeholder="Answer" 
          value={answerText} 
          onChangeText={answerText => this.setState({ answerText })}
          style={styles.inputField}
        />
        <TextButton disabled={!questionText || !answerText} text="Add Card" onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default NewDeck;