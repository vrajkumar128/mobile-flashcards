import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import styles from './styles';
import { saveDeck } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

const NewDeck = ({ navigation }) => {
  const [text, setText] = useState('');
  const [inputRef, setInputRef] = useState(null);

  // Set screen header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Deck'
    });
  }, [navigation]);

  // Focus input on mount in web environment
  useEffect(() => {
    if (Platform.OS === 'web' && inputRef) {
      // Add a slight delay to ensure rendering is complete
      setTimeout(() => {
        try {
          inputRef.focus();
        } catch (e) {
          console.log('Error focusing input:', e);
        }
      }, 100);
    }
  }, [inputRef]);

  // Create a new deck, clear the input field, and redirect to DeckDetail
  const handleSubmit = async () => {
    const savedDeck = await saveDeck(text);
    const newDeck = savedDeck[text];
    setText('');
    navigation.navigate('DeckDetail', { deck: newDeck, deckId: newDeck.title });
  };

  // Conditionally apply TouchableWithoutFeedback
  const Content = (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Deck Title:</Text>
        <TextInput
          ref={ref => setInputRef(ref)}
          placeholder="Enter title here"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
          style={styles.inputField}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          autoFocus={Platform.OS === 'web'}
        />
      </View>
      <TextButton
        disabled={!text}
        text="Create Deck"
        onPress={handleSubmit}
        style={text ? styles.createButtonEnabled : null}
      />
    </KeyboardAvoidingView>
  );

  // On native platforms, use TouchableWithoutFeedback to dismiss keyboard
  // On web, render content directly
  if (Platform.OS === 'web') {
    return Content;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {Content}
      </TouchableWithoutFeedback>
    );
  }
};

export default NewDeck;