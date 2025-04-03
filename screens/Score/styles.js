import { StyleSheet } from 'react-native';
import { gray, blue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  subcontainer: {
    alignItems: 'center',
    width: '100%'
  },

  heading: {
    fontSize: 48,
    color: blue
  },

  caption: {
    fontSize: 24,
    color: gray
  }
});

export default styles;