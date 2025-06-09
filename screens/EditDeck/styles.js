import { StyleSheet } from 'react-native';
import { white, black, gray, blue, darkBlue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },

  titleGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: white,
    textAlign: 'center',
  },

  pencilIcon: {
    position: 'absolute',
    left: '100%',
    marginLeft: 8,
    padding: 4,
  },

  headerEditingInput: {
    color: white,
    fontSize: 17,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 150,
    textAlign: 'center',
  },

  topContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  addButtonContainer: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },

  searchContainer: {
    alignItems: 'center',
    paddingBottom: 15
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    width: '90%'
  },

  searchIcon: {
    marginRight: 8
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: black
  },

  clearButton: {
    marginLeft: 8,
    padding: 2
  },

  searchResults: {
    fontSize: 12,
    color: gray,
    marginTop: 5,
    textAlign: 'center'
  },

  flatList: {
    flex: 1
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
  },

  deleteDeckContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },

  deleteDeckButton: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '90%',
    alignItems: 'center',
    cursor: 'pointer'
  },

  deleteDeckButtonText: {
    fontSize: 18,
    color: white,
    fontWeight: 'bold'
  }
});

export default styles;