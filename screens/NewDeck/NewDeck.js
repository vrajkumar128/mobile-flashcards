import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Text, View } from 'react-native';
import styles from './styles';
import { saveDeck } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

const NewDeck = ({ navigation }) => {
  const [text, setText] = useState('');

  // Set screen header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Deck'
    });
  }, [navigation]);

  // Create a new deck, clear the input field, and redirect to DeckDetail
  const handleSubmit = async () => {
    const savedDeck = await saveDeck(text);
    const newDeck = savedDeck[text];
    setText('');
    navigation.navigate('DeckDetail', { deck: newDeck, deckId: newDeck.title });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Deck Title:</Text>
        <TextInput
          placeholder="Enter title here"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
          style={styles.inputField}
        />
      </View>
      <TextButton
        disabled={!text}
        text="Create Deck"
        onPress={handleSubmit}
        style={styles.createButton}
      />
    </KeyboardAvoidingView>
  );
};

export default NewDeck;