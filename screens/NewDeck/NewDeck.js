import React, { PureComponent } from 'react';
import { View, TextInput, 
  TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { saveDeck } from '../../utils/api';

class NewDeck extends PureComponent {
  state = { 
    text: ''
  }

  // Create a new deck, clear the input field, and redirect to Home
  handleSubmit = () => {
    const { text } = this.state;
    saveDeck(text);
    this.setState({ text: '' });
    this.props.navigation.navigate('Decks');
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
        <TouchableOpacity onPress={this.handleSubmit} style={styles.submitBtn}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewDeck;