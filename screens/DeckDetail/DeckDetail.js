import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { determineCardPlurality } from '../../utils/helpers';
import TextButton from '../../components/TextButton/TextButton';

class DeckDetail extends React.PureComponent {
  // Set screen header to title of deck
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return ({
      title: deck.title
    });
  }

  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View className="text" style={styles.subcontainer}>
          <Text style={styles.heading}>{deck.title}</Text>
          <Text style={styles.caption}>{deck.questions.length} {determineCardPlurality(deck)}</Text>
        </View>
        <View className="buttons" style={styles.subcontainer}>
          <TextButton text="Add Card" />
          <TextButton text="Start Quiz" />
        </View>
      </View>
    );
  }
}

export default DeckDetail;