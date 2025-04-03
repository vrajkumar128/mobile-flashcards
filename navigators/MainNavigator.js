import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import TabNavigator from './TabNavigator';
import NewQuestion from '../screens/NewQuestion/NewQuestion';
import Quiz from '../screens/Quiz/Quiz';
import Score from '../screens/Score/Score';
import { white, darkBlue } from '../utils/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
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
        </Stack.Navigator>
    );
};

export default MainNavigator;