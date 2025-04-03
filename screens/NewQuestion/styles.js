import { StyleSheet } from 'react-native';
import { white, blue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputContainer: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center'
  },

  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: blue,
    textAlign: 'center'
  },

  inputField: {
    width: '100%',
    fontSize: 16,
    padding: 10,
    backgroundColor: white,
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 5
  },

  addButton: {
    backgroundColor: white,
    cursor: 'pointer'
  }
});

export default styles;