import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';
import { saveDeck } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

class NewDeck extends PureComponent {
  state = { 
    text: ''
  }

  // Create a new deck, clear the input field, and redirect to Home
  handleSubmit = async () => {
    const { text } = this.state;
    const savedDeck = await saveDeck(text);
    const newDeck = savedDeck[text];
    this.setState({ text: '' });
    const resetAction = StackActions.reset({
      index: 1,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deck: newDeck }})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { text } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput 
          placeholder="Deck title" 
          value={text} 
          onChangeText={text => this.setState({ text })}
          style={styles.inputField}
        />
        <TextButton disabled={!text} text="Create Deck" onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default NewDeck;