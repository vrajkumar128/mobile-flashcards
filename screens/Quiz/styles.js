import { StyleSheet } from 'react-native';
import { blue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },

  subcontainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 20
  },

  heading: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },

  caption: {
    fontSize: 20,
    color: blue,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10
  },

  correctButton: {
    backgroundColor: '#4cd964',
    borderColor: '#4cd964'
  },

  incorrectButton: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30'
  }
});

export default styles;