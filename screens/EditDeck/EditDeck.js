import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, Platform, BackHandler } from 'react-native';
import { getDeck, saveQuestionList, updateDeckName } from '../../utils/api';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';
import { showAlert } from '../../utils/alertService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const EditDeck = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const { deckId } = route.params;

  // Handle editing deck name
  const handleEditDeckName = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Edit Deck Name',
        `Enter a new name for "${deck.title}":`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Update',
            onPress: (newName) => {
              if (newName && newName.trim() && newName.trim() !== deck.title) {
                updateDeckNameHandler(newName.trim());
              }
            }
          }
        ],
        'plain-text',
        deck.title
      );
    } else {
      setEditingName(deck.title);
      setIsEditingName(true);
    }
  };

  // Handle inline name editing
  const handleSaveName = () => {
    if (editingName.trim() && editingName.trim() !== deck.title) {
      updateDeckNameHandler(editingName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditingName('');
  };

  // Update deck name handler
  const updateDeckNameHandler = async (newName) => {
    try {
      const updatedDeck = await updateDeckName(deck.title, newName);
      if (updatedDeck) {
        setDeck(updatedDeck);
        navigation.navigate('DeckDetail', {
          deck: updatedDeck,
          deckId: updatedDeck.title
        });
      }
    } catch (error) {
      showAlert(
        'Error',
        'Failed to update deck name. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isEditingName) {
          handleCancelEdit();
          return true; // Prevent default back behavior
        }
        return false; // Allow default back behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [isEditingName])
  );

  useLayoutEffect(() => {
    if (deck) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            {isEditingName ? (
              <TextInput
                style={styles.headerEditingInput}
                value={editingName}
                onChangeText={setEditingName}
                onSubmitEditing={handleSaveName}
                onBlur={handleCancelEdit}
                autoFocus
                returnKeyType="done"
              />
            ) : (
              <View style={styles.titleGroup}>
                <Text style={styles.headerTitle}>{deck.title}</Text>
                <TouchableOpacity onPress={handleEditDeckName} style={styles.pencilIcon}>
                  <Ionicons name="pencil" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )
      });
    }
  }, [navigation, deck, isEditingName, editingName, handleEditDeckName]);

  // Refresh the deck
  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  // Initialize the deck's details
  useEffect(() => {
    refreshDeck();
  }, [refreshDeck]);

  // Show edit question dialog
  const handleEditQuestion = (index) => {
    navigation.navigate('NewQuestion', {
      deck,
      editMode: true,
      questionIndex: index,
      questionText: deck.questions[index].question,
      answerText: deck.questions[index].answer
    });
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    navigation.navigate('NewQuestion', { deck });
  };

  // Show confirmation and delete question
  const handleDeleteQuestion = (index) => {
    showAlert(
      'Delete Question',
      'Are you sure you want to delete this question?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedQuestions = deck.questions.filter((_, i) => i !== index);

            // Update the deck with the new questions array
            const updatedDeck = { ...deck, questions: updatedQuestions };

            // Save to storage and update state
            await saveQuestionList(deckId, updatedQuestions);
            setDeck(updatedDeck);
          }
        }
      ]
    );
  };

  if (!deck) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TextButton
          text="Add Question"
          onPress={handleAddQuestion}
          style={{ backgroundColor: '#4cd964', borderColor: '#4cd964', width: '90%' }}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={deck.questions}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Q: {item.question}</Text>
            <Text style={styles.answerText}>A: {item.answer}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditQuestion(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteQuestion(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No questions in this deck</Text>
          </View>
        }
      />
    </View>
  );
};

export default EditDeck;