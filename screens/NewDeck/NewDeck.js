import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';
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
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deck: newDeck }})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  // Trigger submit when user presses Enter
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Deck title" 
          value={text} 
          onChangeText={text => this.setState({ text })}
          onKeyPress={this.handleKeyPress}
          style={styles.inputField}
        />
        <TextButton text="Create Deck" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default NewDeck;