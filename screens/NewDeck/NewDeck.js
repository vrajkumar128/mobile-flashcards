import React, { PureComponent } from 'react';
import { View, TextInput, 
  TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { saveDeck } from '../../utils/helpers';

class NewDeck extends PureComponent {
  state = { 
    text: ''
  }

  handleSubmit = () => {
    const { text } = this.state;
    saveDeck(text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Deck name" 
          value={text} 
          onChangeText={text => this.setState({ text })}
          onPress={this.handleSubmit}
          style={styles.inputField}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.submitBtn}>
          <Text>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewDeck;