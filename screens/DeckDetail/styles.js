import { StyleSheet } from 'react-native';
import { gray, black, white } from '../../utils/colors';

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

  groupedContainer: {
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
  },

  enabledButton: {
    backgroundColor: '#4cd964',
    borderColor: black,
    color: white
  },
});

export default styles;