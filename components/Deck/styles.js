import { StyleSheet } from 'react-native';
import { white, black, blue, darkBlue } from '../../utils/colors';

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
    cursor: 'pointer'
  },
  containerPressed: {
    backgroundColor: darkBlue,
    borderColor: white
  },
  contents: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
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
  }
});

export default styles;