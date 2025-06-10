import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = screenWidth * 0.75;

const Sidebar = ({ isVisible, onClose, navigation }) => {
    const translateX = useSharedValue(isVisible ? 0 : -SIDEBAR_WIDTH);

    React.useEffect(() => {
        translateX.value = withTiming(isVisible ? 0 : -SIDEBAR_WIDTH, {
            duration: 300,
        });
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const handleMenuItemPress = (screen) => {
        onClose();
        if (screen && navigation) {
            navigation.navigate(screen);
        }
    };

    const menuItems = [
        { icon: 'home', title: 'All Decks', screen: 'Decks' },
        { icon: 'add-circle', title: 'New Deck', screen: 'NewDeck' },
        { icon: 'settings', title: 'Settings', screen: null },
        { icon: 'help-circle', title: 'Help', screen: null },
        { icon: 'information-circle', title: 'About', screen: null },
    ];

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.overlayTouchable}
                    onPress={onClose}
                    activeOpacity={1}
                />
                <Animated.View style={[styles.sidebar, animatedStyle]}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Mobile Flashcards</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuContainer}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => handleMenuItemPress(item.screen)}
                            >
                                <Ionicons name={item.icon} size={24} color="#333" style={styles.menuIcon} />
                                <Text style={styles.menuText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default Sidebar;