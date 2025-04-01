import { StyleSheet } from 'react-native';
import { white, black } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignItems: 'center',
    backgroundColor: white,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: black,
    cursor: 'pointer'
  },
  containerPressed: {
    backgroundColor: black,
  },
  contents: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 20
  },
  text: {
    color: black
  },
  textPressed: {
    color: white
  }
});

export default styles;