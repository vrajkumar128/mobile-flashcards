import { createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import { black, white } from '../utils/colors';
import NewQuestion from '../screens/NewQuestion/NewQuestion';
import Quiz from '../screens/Quiz/Quiz';
import Score from '../screens/Score/Score';

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
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  Score: {
    screen: Score,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
});

export default StackNavigator;