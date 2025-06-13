import { StyleSheet } from 'react-native';
import { blue, white, black, gray } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
  },

  cardContainer: {
    width: '95%',
    maxWidth: 600,
    height: '85%',
    perspective: 1000
  },

  cardTouchable: {
    width: '100%',
    height: '100%'
  },

  card: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },

  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },

  cardFront: {
    backgroundColor: white
  },

  cardBack: {
    backgroundColor: '#f8f9fa'
  },

  cardTextContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: 10
  },

  cardTextContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%'
  },

  cardText: {
    fontSize: 36,
    textAlign: 'center',
    color: black,
    fontWeight: '500',
    lineHeight: 40,
    includeFontPadding: false,
    textAlignVertical: 'center',
    minHeight: 30
  },

  tapHint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 14,
    color: blue,
    fontStyle: 'italic',
    opacity: 0.7
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40
  },

  iconButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },

  correctButton: {
    backgroundColor: '#4cd964'
  },

  incorrectButton: {
    backgroundColor: '#ff3b30'
  }
});

export default styles;