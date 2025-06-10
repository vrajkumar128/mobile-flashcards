import { StyleSheet, Dimensions } from 'react-native';
import { white, black, darkBlue, gray } from '../../utils/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    overlayTouchable: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: screenWidth * 0.75,
    },

    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth * 0.75,
        height: screenHeight,
        backgroundColor: white,
        shadowColor: black,
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },

    header: {
        backgroundColor: darkBlue,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        color: white,
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },

    closeButton: {
        padding: 5,
    },

    menuContainer: {
        flex: 1,
        paddingTop: 20,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },

    menuIcon: {
        marginRight: 15,
        width: 24,
    },

    menuText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
});

export default styles;