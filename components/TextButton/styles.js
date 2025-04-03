import { StyleSheet } from 'react-native';
import { white, black, blue, darkBlue } from '../../utils/colors';

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
  },
  btnText: {
    fontSize: 18,
    color: black
  },
  btnTextPressed: {
    color: white
  }
});

export default styles;