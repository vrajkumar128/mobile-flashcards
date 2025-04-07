import { StyleSheet } from 'react-native';
import { white, black, gray, blue, darkBlue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },

  addButtonContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  listContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10
  },

  questionContainer: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15
  },

  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },

  answerText: {
    fontSize: 16,
    marginBottom: 15,
    color: gray
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  editButton: {
    backgroundColor: '#4cd964',
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },

  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 5
  },

  buttonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 14
  },

  deleteButtonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 14
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },

  emptyText: {
    fontSize: 18,
    color: gray
  }
});

export default styles;