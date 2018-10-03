import React from 'react';
import { FlatList, Text } from 'react-native';
import { getDecks } from '../../utils/api';
import Deck from '../../components/Deck/Deck';

class DeckList extends React.PureComponent {
  state = {
    decks: null
  }

  // Retrieve the list of decks
  async componentDidMount() {
    const decks = await getDecks();
    this.setState({ decks });
  }

  // Reload the component upon a change in decks
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.componentDidMount();
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

    return <Text>Loading...</Text>
  }
}

export default DeckList;