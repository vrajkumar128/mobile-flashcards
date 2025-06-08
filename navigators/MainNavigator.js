import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from '../screens/DeckList/DeckList';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import NewDeck from '../screens/NewDeck/NewDeck';
import NewQuestion from '../screens/NewQuestion/NewQuestion';
import Quiz from '../screens/Quiz/Quiz';
import Score from '../screens/Score/Score';
import EditDeck from '../screens/EditDeck/EditDeck';
import { white, darkBlue } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: darkBlue,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={white}
                        style={{ marginLeft: 15 }}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="Decks"
                component={DeckList}
            />
            <Stack.Screen
                name="NewDeck"
                component={NewDeck}
                options={{
                    title: 'New Deck',
                }}
            />
            <Stack.Screen
                name="DeckDetail"
                component={DeckDetail}
            />
            <Stack.Screen
                name="NewQuestion"
                component={NewQuestion}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
            />
            <Stack.Screen
                name="Score"
                component={Score}
            />
            <Stack.Screen
                name="EditDeck"
                component={EditDeck}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;