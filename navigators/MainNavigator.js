import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from '../screens/DeckList/DeckList';
import DeckDetail from '../screens/DeckDetail/DeckDetail';
import NewDeck from '../screens/NewDeck/NewDeck';
import NewQuestion from '../screens/NewQuestion/NewQuestion';
import Quiz from '../screens/Quiz/Quiz';
import Score from '../screens/Score/Score';
import EditDeck from '../screens/EditDeck/EditDeck';
import Settings from '../screens/Settings/Settings';
import { white, darkBlue } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const MainNavigator = () => {
    const handleHamburgerPress = () => {
        // TODO: Implement hamburger menu functionality
        console.log('Hamburger menu pressed');
    };

    const handleGearPress = () => {
        // TODO: Implement settings functionality
        console.log('Settings pressed');
    };

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
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={handleHamburgerPress}
                            style={{ marginLeft: 15, padding: 5 }}
                        >
                            <Ionicons
                                name="menu"
                                size={24}
                                color={white}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleGearPress}
                            style={{ marginRight: 15, padding: 5 }}
                        >
                            <Ionicons
                                name="settings"
                                size={24}
                                color={white}
                            />
                        </TouchableOpacity>
                    ),
                }}
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
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Settings',
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;