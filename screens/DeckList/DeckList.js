import React from 'react';
import { FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import Deck from '../../components/Deck/Deck';

class DeckList extends React.PureComponent {
  state = {
    decks: null
  }

  // Refresh the list of decks
  refreshDecks = async () => {
    const decks = await getDecks();
    this.setState({ decks });
  }

  // Initialize the deck list
  componentDidMount() {
    this.refreshDecks();
  }

  // Reload the deck list upon adding a deck
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.refreshDecks();
    }
  }

  // Display details for an individual deck when that deck is pressed
  handlePress = (deck) => {
    const { navigation } = this.props;
    navigation.navigate('DeckDetail', { deck });
  }

  render() {
    const { decks } = this.state;

    if (decks) {
      const deckArray = Object.keys(decks).map(deckName => decks[deckName]); // Format decks for <FlatList /> component

      return (
        <FlatList
          data={deckArray}
          renderItem={({ item }) => <Deck deck={item} onPress={() => this.handlePress(item)} />}
          keyExtractor={item => item.title}
        />
      );
    }

    return null;
  }
}

export default DeckList;