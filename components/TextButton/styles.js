import { StyleSheet } from 'react-native';
import { white, black, blue, darkBlue, gray } from '../../utils/colors';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
    cursor: 'pointer'
  },
  btnPressed: {
    backgroundColor: darkBlue,
    borderColor: black
  },
  btnText: {
    fontSize: 18,
    color: black
  },
  btnTextPressed: {
    color: white
  },
  btnDisabled: {
    backgroundColor: '#f8f8f8',
    borderColor: '#d3d3d3',
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  btnTextDisabled: {
    color: gray
  }
});

export default styles;