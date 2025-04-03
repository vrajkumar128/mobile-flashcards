import { StyleSheet } from 'react-native';
import { gray, blue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  subcontainer: {
    alignItems: 'center',
    width: '100%'
  },

  headerContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%'
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 40
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