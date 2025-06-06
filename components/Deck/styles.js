import { StyleSheet } from 'react-native';
import { white, black, blue, darkBlue, gray } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: white,
    marginVertical: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: black,
    cursor: 'pointer',
    minHeight: 80
  },
  containerPressed: {
    backgroundColor: darkBlue,
    borderColor: white
  },
  containerDisabled: {
    opacity: 0.8,
    backgroundColor: '#f5f5f5'
  },
  contents: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15
  },
  title: {
    fontSize: 20,
    color: black
  },
  text: {
    color: black
  },
  textPressed: {
    color: white
  },
  textDisabled: {
    color: gray
  }
});

export default styles;