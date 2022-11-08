import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, TouchableOpacity, Modal, SafeAreaView, StyleSheet, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SaveClass from './SaveClass';
import { TextInput } from 'react-native-paper';
import Icon, { Icons } from '../components/Icons';
import Timer from './Timer';
import OpButton from './OpButton';
import AText from './AText';

const textSize = 23;
const optSize = 20;

export default function NestingView({ navigation, progresso, sec, adicionaltxt, pergunta, txtantes, 
    txtantes2, txtantes3, txtdepois, txtdepois2, txtdepois3, txtCerto1, txtCerto2, txtCerto3, 
    tamanhoInput, navegar, layer = 1, qtdop = 1, aulaSalvar, Salvar}) {
    //Constante de tradução, usar {t("CHAVE")} para tradução
    const { t, i18n } = useTranslation();

    const { colors } = useTheme(); //Variavel de cor do tema

    const [visibleModal, setVisibleModal] = useState('false')
    const [visibleModalE, setVisibleModalE] = useState('false')
    const [Textadd, setTextadd] = useState('Textadd')
    const [InputText, setInputText] = useState('');
    const [InputText2, setInputText2] = useState('');
    const [InputText3, setInputText3] = useState('');
    const [TEXTO, setTEXTO] = useState('');
    const [VisibleLayer, setLayer] = useState("selectLayer")
    const [VisibleLayer2, setLayer2] = useState("selectLayer")
    const [VisibleLayer3, setLayer3] = useState("selectLayer")
    const [VisibleInput, setInput] = useState("removeInput")
    const [VisibleInput2, setInput2] = useState("removeInput")

    

    useEffect(() => {
        if (adicionaltxt != 'none')
            setTextadd('text')
        if (layer === 1) {
            setLayer("textarea")
            if (qtdop === 2) {
                setInput("input")
            }
            if (qtdop === 3) {
                setInput("input")
                setInput2("input")
            }
        }
        if (layer === 2) {
            setLayer2("textarea")
            if (qtdop === 2) {
                setInput("input2")
            }
            if (qtdop === 3) {
                setInput("input2")
                setInput2("input2")
            }
        }
        if (layer === 3) {
            setLayer3("textarea")
            if (qtdop === 2) {
                setInput("input3")
            }
            if (qtdop === 3) {
                setInput("input3")
                setInput2("input3")
            }
        }
    }, [])

    const Verificar = () => {
        setTEXTO(InputText)
        if (qtdop === 3) {
            if (InputText == txtCerto1 && InputText2 == txtCerto2 && InputText3 == txtCerto3)
                setVisibleModal(true)
            else
                setVisibleModalE(true)
        } else if (qtdop === 2) {
            if (InputText == txtCerto1 && InputText2 == txtCerto2)
                setVisibleModal(true)
            else
                setVisibleModalE(true)
        } else if (qtdop === 1) {
            if (InputText == txtCerto1)
                setVisibleModal(true)
            else
                setVisibleModalE(true)
        } else {
            console.log("ERRO")
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss} accessible={false}
        >
            <View style={[styles.container, { backgroundColor: colors.card }]}>
                <View>
                    <View style={styles.progressBar}><View style={[StyleSheet.absoluteFill, { backgroundColor: "#637aff", width: progresso }]} /></View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Icon
                            type={Icons.Ionicons}
                            name="ios-close-outline"
                            color={"#33526E"}
                            size={60}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Timer navigation={navigation} seconds={sec} />
                    <SaveClass aulaSalvar={aulaSalvar} Salvar={Salvar}/>
                    <SafeAreaView style={styles.zIndex}>
                        <AText style={[styles[Textadd], { color: colors.text }]} defaultSize={textSize}>{adicionaltxt}</AText>
                        <AText style={[styles.text, { color: colors.text }]} defaultSize={textSize}>{pergunta}</AText>
                        <View style={[styles[VisibleLayer], { backgroundColor: colors.primary }]}>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtantes}</Text>
                            <TextInput style={[styles.input, { width: tamanhoInput }]} onChangeText={(value) => setInputText(value)}></TextInput>
                            <TextInput style={[styles[VisibleInput], { width: tamanhoInput }]} onChangeText={(value2) => setInputText2(value2)}></TextInput>
                            <TextInput style={[styles[VisibleInput2], { width: tamanhoInput }]} onChangeText={(value3) => setInputText3(value3)}></TextInput>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtdepois}</Text>
                        </View>
                        <View style={[styles[VisibleLayer2], { backgroundColor: colors.primary }]}>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtantes}</Text>
                            <Text style={[styles.textopt2, { color: colors.text }]}>{txtantes2}</Text>
                            <TextInput style={[styles.input2, { width: tamanhoInput }]} onChangeText={(value) => setInputText(value)}></TextInput>
                            <TextInput style={[styles[VisibleInput], { width: tamanhoInput }]} onChangeText={(value2) => setInputText2(value2)}></TextInput>
                            <TextInput style={[styles[VisibleInput2], { width: tamanhoInput }]} onChangeText={(value3) => setInputText3(value3)}></TextInput>
                            <Text style={[styles.textopt2, { color: colors.text }]}>{txtdepois2}</Text>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtdepois}</Text>
                        </View>
                        <View style={[styles[VisibleLayer3], { backgroundColor: colors.primary }]}>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtantes}</Text>
                            <Text style={[styles.textopt2, { color: colors.text }]}>{txtantes2}</Text>
                            <Text style={[styles.textopt3, { color: colors.text }]}>{txtantes3}</Text>
                            <TextInput style={[styles.input3, { width: tamanhoInput }]} onChangeText={(value) => setInputText(value)}></TextInput>
                            <TextInput style={[styles[VisibleInput], { width: tamanhoInput }]} onChangeText={(value2) => setInputText2(value2)}></TextInput>
                            <TextInput style={[styles[VisibleInput2], { width: tamanhoInput }]} onChangeText={(value3) => setInputText3(value3)}></TextInput>
                            <Text style={[styles.textopt3, { color: colors.text }]}>{txtdepois3}</Text>
                            <Text style={[styles.textopt2, { color: colors.text }]}>{txtdepois2}</Text>
                            <Text style={[styles.textopt, { color: colors.text }]}>{txtdepois}</Text>
                        </View>
                    </SafeAreaView>
                </View>
                <OpButton theme={"nextButton"} title={t("verify")} onPressFunction={() => Verificar()} />

                <Modal
                    visible={visibleModal}
                    transparent={true}
                >
                    <SafeAreaView>
                        <View style={[styles.contant, { backgroundColor: colors.card }]}>
                            <AText style={[styles.textModal, { color: colors.text }]} defaultSize={textSize}>{t("congrats")}</AText>
                            <OpButton theme={"modalButton"} title={t("continue")} onPressFunction={() => navigation.navigate(navegar)} />
                        </View>
                    </SafeAreaView>
                </Modal>
                <Modal
                    visible={visibleModalE}
                    transparent={true}
                >
                    <SafeAreaView>
                        <View style={[styles.contant, { backgroundColor: colors.card }]}>
                            <AText style={[styles.textModal, { color: colors.text }]} defaultSize={textSize}>{t("oh no")}</AText>
                            <OpButton theme={"modalButtonE"} title={t("try again")} onPressFunction={() => setVisibleModalE(false)} />
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0E151C',
    },
    scroller: {
        marginHorizontal: 5,
        marginVertical: 10,
        height: 630,
        paddingBottom: 500,
    },
    box: {
        marginLeft: "1.5%",
        marginTop: 5,
        backgroundColor: '#141f29',
        borderColor: 'rgba(99, 122, 255, 0.2)',
        height: "92%",
        width: "97%",
    },
    text: {
        margin: 20,
        flexGrow: 1,
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 23,
        fontWeight: "bold"
    },
    image: {
        margin: 10,
        height: 230,
        width: 310,
    }
    ,
    image2: {
        borderRadius: 10,
        margin: 10,
        height: 35,
        width: 310,
    },
    image3: {
        margin: 10,
        height: 100,
        width: 350,
    },
    image4: {
        margin: 10,
        height: 100,
        width: 350,
    },
    icon: {
        marginRight: 20,
        top: 10,
    },
    contant: {
        marginTop: 600,
        marginBottom: 50,
        marginVertical: 20,
        zIndex: 99,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0, 0.2)',
        backgroundColor: '#0E151C',

        shadowColor: 'rgba(0,0,0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        shadowOpacity: 0.28,
        shadowRadius: 4,
    },
    actionText: {
        fontFamily: 'Roboto',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    textModal: {
        flexGrow: 1,
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 23,
        fontWeight: "bold"
    },
    Textadd: {
        display: 'none'
    },
    progressBar: {
        top: -2,
        height: 8,
        width: '100%',
        backgroundColor: 'white',
    },
    txtarea: {
        backgroundColor: '#141f29',
        width: '100%',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textopt: {
        margin: 9,
        flexGrow: 1,
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    textopt2: {
        margin: 9,
        flexGrow: 1,
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "10%",
    },
    textopt3: {
        margin: 9,
        flexGrow: 1,
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "20%",
    },
    input: {
        height: 30,
        borderRadius: -20,
        marginTop: "1%",
        marginLeft: "10%"
    },
    input2: {
        height: 30,
        borderRadius: -20,
        marginTop: "1%",
        marginLeft: "20%"
    },
    input3: {
        height: 30,
        borderRadius: -20,
        marginTop: "1%",
        marginLeft: "30%"
    },
    removeInput: {
        display: 'none'
    },
    selectLayer: {
        display: 'none'
    },
    zIndex:{
        zIndex:999
    }

})