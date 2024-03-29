import React from 'react';
import { useContext } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../../common/Contexts/AppContext';
import { useTheme } from '@react-navigation/native';
import { CustomDarkMode } from '../../common/Themes/DefaultThemes';

const CustomAlert = ({ visible, onDismiss, title, message, buttonText }) => {

    const { theme } = useContext(AppContext);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, {backgroundColor: theme == CustomDarkMode ? "#141f29":'#E5E5E5'}]}>
                    <Text style={[styles.title, {color: theme == CustomDarkMode ? "#F1F1F1":'#000'}]}>{title}</Text>
                    <Text style={[styles.message, {color: theme == CustomDarkMode ? "#F1F1F1":'#000'}]}>{message}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDismiss}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    modalView: {
        margin: 20,
        backgroundColor: "#141f29",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 24,
        color: "#7977FD",
        marginBottom: 20,
        textAlign: "center"
    },
    message: {
        fontSize: 19,
        color: '#fff',
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#7977FD",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 45,
        paddingRight: 45,
        elevation: 2,
        marginTop: 15
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default CustomAlert;