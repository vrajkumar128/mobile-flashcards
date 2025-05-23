import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from '../screens/DeckList/DeckList';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import NewDeck from '../screens/NewDeck/NewDeck';
import NewQuestion from '../screens/NewQuestion/NewQuestion';
import Quiz from '../screens/Quiz/Quiz';
import Score from '../screens/Score/Score';
import QuestionList from '../screens/QuestionList/QuestionList';
import { white, darkBlue } from '../utils/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Decks"
                component={DeckList}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="NewDeck"
                component={NewDeck}
                options={{
                    title: 'New Deck',
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="DeckDetail"
                component={DeckDetail}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="NewQuestion"
                component={NewQuestion}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="Score"
                component={Score}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
            <Stack.Screen
                name="QuestionList"
                component={QuestionList}
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: darkBlue,
                    }
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;