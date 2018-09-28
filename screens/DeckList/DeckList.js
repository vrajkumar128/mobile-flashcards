import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getDecks } from '../../utils/api';
import styles from './styles';

// List deck names and # of cards in each deck
class DeckList extends React.PureComponent {
  state = {
    decks: null
  }

  async componentDidMount() {
    const decks = await getDecks();
    this.setState({ decks });
  }

  render() {
    const { decks } = this.state;

    return (
      decks && Object.keys(decks).map(deckName => (
        <TouchableOpacity key={deckName} style={styles.container}>
          <View className="contents" style={styles.contents}>
            <Text style={{ fontSize: 20 }}>{deckName}</Text>
            <Text>{decks[deckName].questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      ))
    );
  }
}

export default DeckList;