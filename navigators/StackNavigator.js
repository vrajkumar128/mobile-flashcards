import { createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import { black, white } from '../utils/colors';

// Create stack navigator
const StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
});

export default StackNavigator;