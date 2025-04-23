import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getDeck, saveQuestionList } from '../../utils/api';
import styles from './styles';
import TextButton from '../../components/TextButton/TextButton';
import { showAlert } from '../../utils/alertService'; // Import the new alert service

const QuestionList = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { deckId } = route.params;

  // Set screen header to title of deck
  useLayoutEffect(() => {
    if (deck) {
      navigation.setOptions({
        title: `${deck.title} Questions`
      });
    }
  }, [navigation, deck]);

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

export default QuestionList;