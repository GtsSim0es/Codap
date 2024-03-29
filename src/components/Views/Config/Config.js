import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Switch } from 'react-native-paper';
import DefaultHeader from '../../DefaultHeader';
import Icon, { Icons } from '../../Icons';
import TranslateComponet from './TranslateComponent';
import FontComponent from './FontComponent';
import { useTranslation } from 'react-i18next';
import AText from '../../Shared/AText';
import ThemeComponent from './ThemeComponent';
import { useTheme } from '@react-navigation/native';
import { VersionComponent, AboutComponent } from './InformationalComponents';
import { AppContext } from '../../../common/Contexts/AppContext';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
const TextSize1 = 25;

export default function Config({ navigation }) {
    //Constante de tradução, usar {t("CHAVE")} para tradução
    const { t, i18n } = useTranslation();

    const { colors } = useTheme(); //Variavel de cor do tema

    const { notificationState, toggleNotification, showAlert } = useContext(AppContext);

    //Switch
    const [isSwitchOn, setIsSwitchOn] = React.useState(notificationState);

    const onToggleSwitch = () => {
        const newState = !isSwitchOn;
        setIsSwitchOn(newState);
        toggleNotification(newState);
        if (newState) {
            check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            setIsSwitchOn(false);
                            toggleNotification(false);
                            showAlert(t("alert.notification.title"), t("alert.notification.message"));
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <DefaultHeader title={t("settings")} />
            <ScrollView style={styles.scroller} showsVerticalScrollIndicator={false}>
                <View style={[{ flexDirection: "row" }, { alignItems: "center" }]}>
                    <Icon type={Icons.MaterialCommunityIcons} name="cellphone-cog" style={styles.icon} size={25} color={"#5469D3"} />
                    <AText style={styles.text} defaultSize={TextSize1}>{t("system")}</AText>
                    <View style={[styles.line, { backgroundColor: colors.text }]} />
                </View>
                <TranslateComponet />
                <FontComponent />
                <ThemeComponent />
                <View style={[{ flexDirection: "row" }, { alignItems: "center" }]}>
                    <Icon type={Icons.Ionicons} name="notifications" style={styles.icon} size={25} color={"#5469D3"} />
                    <AText style={styles.text} defaultSize={TextSize1}>{t("notification")}</AText>
                    <View style={[styles.line, { backgroundColor: colors.text }]} />
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.background }]} onPress={() => onToggleSwitch()}>
                    <AText style={[styles.text3, { color: colors.text }]} defaultSize={20}>{t("notifications")}</AText>
                    <Switch style={{ marginTop: 5 }} value={isSwitchOn} onValueChange={onToggleSwitch} color={'#5469D3'} />
                </TouchableOpacity>
                <View style={[{ flexDirection: "row" }, { alignItems: "center" }]}>
                    <Icon type={Icons.MaterialCommunityIcons} name="information-outline" style={styles.icon} size={25} color={"#5469D3"} />
                    <AText style={styles.text} defaultSize={TextSize1}>{t("informations")}</AText>
                    <View style={[styles.line, { backgroundColor: colors.text }]} />
                </View>
                <VersionComponent />
                <AboutComponent />
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({

    container: {
        //backgroundColor: '#141f29',
        height: "100%",
    },
    scroller: {
        width: '90%',
        marginLeft: '5%',
        marginBottom: '18%',
    },
    direction: {
        flexDirection: "row",
        alignItems: "center",
        height: "30%",
        marginBottom: 15,
        backgroundColor: '#141f29',
        borderTopWidth: 2,
        borderTopColor: 'rgba(0,0,0, 0.2)',
        shadowColor: "#637aff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.28,
        shadowRadius: 7.00,
        elevation: 7,
    },
    account: {
        left: "5%",
        borderRadius: 75,
        backgroundColor: "#33526E",
        shadowColor: "#637aff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.28,
        shadowRadius: 7.00,
        elevation: 20,
    },
    components: {
        flexDirection: "column",
        width: "48%",
        marginLeft: '10%',
    },
    text: {
        color: "#5469D3",
        fontSize: 25,
        marginTop: 20,
        marginRight: 10,
    },
    text2: {
        color: "#5469D3",
        fontSize: 19,
        marginBottom: 20,
    },
    line: {
        height: 1,
        marginTop: 25,
        marginRight: 10,
        backgroundColor: 'white',
        flexGrow: 1,
    },
    icon: {
        marginTop: 20,
        marginRight: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        height: 60,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#141f29',
        borderRadius: 10,
        shadowColor: "#637aff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.28,
        shadowRadius: 7.00,
        elevation: 7,
    },
    text3: {
        color: "white",
    },
})