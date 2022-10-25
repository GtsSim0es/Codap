import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Keyboard
} from 'react-native';
import CustomButton from '../Helpers/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function Login({ navigation }) {

    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        createTable();
        getData();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Senha Text, Email TEXT);"
            )
        })
    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Senha, Email FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {

                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (email.length == 0 || senha.length == 0) {
            Alert.alert('Alerta!', 'Por favor preencha todos os campos.')
        } else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "SELECT Senha, Email FROM Users WHERE Senha=? and Email=?",
                        [senha, email],
                        (tx, results) => {
                            var len = results.rows.length;
                            if (len > 0) {
                                navigation.navigate('Home', { screen: 'Aulas'});
                            } else {
                                Alert.alert('Alerta!', 'Senha ou Email incorretos')
                            }
                        }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const onPressHandler = () => {
        navigation.navigate('Register')
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={styles.container}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss} accessible={false}
            >
                <View style={styles.box}>
                    <View style={styles.header}>
                        <Image style={styles.tinyLogo} source={require('../../assets/code.png')} />
                        <Text style={styles.title}>Codap</Text>
                    </View>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(value) => setEmail(value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            onChangeText={(value) => setSenha(value)}
                            secureTextEntry={true}
                        />
                        <CustomButton
                            title='Login'
                            color="#7977FD"
                            onPressFunction={setData}
                        />
                        <TouchableOpacity onPress={onPressHandler}><Text style={styles.register}>Clique aqui para se registrar</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    register: {
        color: 'white',
        marginLeft: 50,
        marginTop: 30,
        fontSize: 17,
    },
    button: {
        marginLeft: 50,
        alignItems: 'center',
        marginTop: 30,
        width: 170,
        backgroundColor: "#7977FD",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    },
    input: {
        backgroundColor: "#7977FD",
        borderRadius: 10,
        height: 50,
        color: '#fff',
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    tinyLogo: {
        width: 60,
        height: 60,
    },
    title: {
        marginLeft: 10,
        marginTop: 3,
        fontSize: 37,
        fontWeight: 'bold',
        color: "#7977FD"
    },
    box: {
        backgroundColor: "rgba(10, 10, 10, 0.7)",
        borderRadius: 20,
        height: 500,
        width: 370,
        alignItems: 'center'
    }
})
