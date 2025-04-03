import { StyleSheet } from 'react-native';
import { gray, black } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  flexContainer: {
    height: '65%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 40,
    alignSelf: 'center'
  },

  headerContainer: {
    alignItems: 'center',
    width: '100%'
  },

  heading: {
    fontSize: 48,
    color: black
  },

  caption: {
    fontSize: 24,
    color: gray
  }
});

export default styles;