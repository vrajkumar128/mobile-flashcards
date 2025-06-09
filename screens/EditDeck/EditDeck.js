import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, Platform, BackHandler } from 'react-native';
import { getDeck, saveQuestionList, updateDeckName, removeDeck } from '../../utils/api';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';
import { showAlert } from '../../utils/alertService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const EditDeck = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { deckId } = route.params;

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
          return true;
        }
        return false;
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

  const refreshDeck = useCallback(async () => {
    const deckData = await getDeck(deckId);
    setDeck(deckData);
  }, [deckId]);

  useEffect(() => {
    refreshDeck();
  }, [refreshDeck]);

  useEffect(() => {
    if (deck && deck.questions) {
      if (searchQuery.trim() === '') {
        setFilteredQuestions(deck.questions);
      } else {
        const filtered = deck.questions.filter((question, index) => {
          const searchLower = searchQuery.toLowerCase();
          return (
            question.question.toLowerCase().includes(searchLower) ||
            question.answer.toLowerCase().includes(searchLower)
          );
        });
        setFilteredQuestions(filtered);
      }
    }
  }, [deck, searchQuery]);

  const handleEditQuestion = (index) => {
    const originalIndex = deck.questions.findIndex(q => q === filteredQuestions[index]);
    navigation.navigate('NewQuestion', {
      deck,
      editMode: true,
      questionIndex: originalIndex,
      questionText: filteredQuestions[index].question,
      answerText: filteredQuestions[index].answer
    });
  };

  const handleAddQuestion = () => {
    navigation.navigate('NewQuestion', { deck });
  };

  const handleDeleteQuestion = (index) => {
    const originalIndex = deck.questions.findIndex(q => q === filteredQuestions[index]);

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
            const updatedQuestions = deck.questions.filter((_, i) => i !== originalIndex);
            const updatedDeck = { ...deck, questions: updatedQuestions };
            await saveQuestionList(deckId, updatedQuestions);
            setDeck(updatedDeck);
          }
        }
      ]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleDeleteDeck = () => {
    showAlert(
      'Delete Deck',
      `Are you sure you want to delete the deck "${deck.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await removeDeck(deck.title);
            navigation.navigate('Decks');
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
      <View style={styles.topContainer}>
        <View style={styles.addButtonContainer}>
          <TextButton
            text="Add Question"
            onPress={handleAddQuestion}
            style={{ backgroundColor: '#4cd964', borderColor: '#4cd964', width: '90%' }}
          />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search questions and answers..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && Platform.OS !== 'ios' && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          {searchQuery.length > 0 && (
            <Text style={styles.searchResults}>
              {filteredQuestions.length} of {deck.questions.length} cards
            </Text>
          )}
        </View>
      </View>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={filteredQuestions}
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
        keyExtractor={(item, index) => `${index}-${item.question}`}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery.length > 0
                ? `No cards match "${searchQuery}"`
                : "No questions in this deck"
              }
            </Text>
          </View>
        }
      />

      <View style={styles.deleteDeckContainer}>
        <TouchableOpacity
          style={styles.deleteDeckButton}
          onPress={handleDeleteDeck}
        >
          <Text style={styles.deleteDeckButtonText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDeck;