import React from 'react';
import { useTranslation } from 'react-i18next';
import TheoryView from '../../../../components/Shared/TheoryView';
import OptionView from '../../../../components/Shared/OptionView';
import SelectView from '../../../../components/Shared/SelectView';
import TextView from '../../../../components/Shared/TextView';
import NestingView from '../../../../components/Shared/NestingView';

export function Interações({ navigation }) {
    const { t } = useTranslation();
    return (
        <TheoryView
            navigation={navigation}
            progresso="0%"
            mainText={t("js.basic.interactions.learningInteractions")}
            secondText={t("js.basic.interactions.interactionsPopupExplanation")}
            thirdText={t("js.basic.interactions.interactionExample")}
            codeLanguage='HTML'
            code = {`<!DOCTYPE html>
<html>
    <head>
        <title>Interaction Example</title>
    </head>
    <body>
        <button onclick="displayAll()">Click me</button>

        <script>
            function displayAll() {
                alert("Hello, this is an alert!");
                let name = prompt("What's your name?", "Insert here");
                let confirmation = confirm("Are you sure you want to proceed?");
            }
        </script>
    </body>
</html>`}
            endText={t("js.basic.interactions.deviceDifference")}
            highlight={["JavaScript", "interactions", "interações", "alert", "prompt", "confirm", "pop-up", "pop-ups", "alerta", "confirmação"]}
            navegar="InteraçõesEx1"
        />
    )
}

export function InteraçõesEx1({ navigation }) {
    const { t } = useTranslation();
    return (
        <NestingView
            navigation={navigation}
            progresso="20%"
            sec="9999"
            qtdop={1}
            layer={1}
            adicionaltxt={t("js.basic.interactions.alert")}
            pergunta={t("js.basic.interactions.createAlertTrue")}
            txtantes="<script>"
            txtdepois="</script>"
            txtCerto1='alert(true);'
            txtCerto2='alert(true)'
            tamanhoInput="40%"
            txtToHighlight={["alert", "true"]}
            navegar="InteraçõesEx2"
        />
    )
}

export function InteraçõesEx2({ navigation }) {
    const { t } = useTranslation();
    return (
        <SelectView
            navigation={navigation}
            progresso="40%"
            sec="9999"
            adicionaltxt={t("js.basic.interactions.promptVariableExplanation")}
            pergunta={t("js.basic.interactions.createPromptCODAP")}
            opt1='CODAP'
            opt2=' = '
            opt3='let '
            opt4='prompt('
            opt5='"DIGITE O VALOR"'
            opt6=' , '
            opt7=')'
            opt8='" "'
            txtCerto='let CODAP = prompt("DIGITE O VALOR" , " ")'
            txtToHighlight={["prompt", "CODAP", "title", "título", "padrão", "default"]}
            navegar="InteraçõesEx3"
        />
    )
}

export function InteraçõesEx3({ navigation }) {
    const { t } = useTranslation();
    return (
        <SelectView
            navigation={navigation}
            progresso="60%"
            sec="9999"
            adicionaltxt={t("js.basic.interactions.confirmReturnExplanation")}
            pergunta={t("js.basic.interactions.createConfirmBOOLEAN")}
            opt1='let '
            opt2='('
            opt3='BOOLEAN'
            opt4='confirm'
            opt5=' = '
            opt6={t("js.basic.interactions.activateNotification")}
            opt7=');'
            txtCerto={t("js.basic.interactions.answare")}
            txtToHighlight={["confirm", "BOOLEAN", "OK", "cancelar", "cancel", "pergunta", "question"]}
            navegar="InteraçõesEx4"
        />
    )
}

export function InteraçõesEx4({ navigation }) {
    const { t } = useTranslation();
    return (
        <OptionView
            navigation={navigation}
            progresso="80%"
            sec="9999"
            adicionaltxt={t("js.basic.interactions.defaultValueAssignedToAGE")}
            pergunta='let IDADE = prompt("Digite a idade" , "10")'
            opt1="0"
            opt2="undefined"
            opt3="null"
            opt4="10"
            optCerta="opt4"
            txtToHighlight={["IDADE", "AGE", "Digite a idade", "Enter the age", "10", "prompt"]}
            navegar="InteraçõesEx5"
        />
    )
}

export function InteraçõesEx5({ navigation }) {
    const { t } = useTranslation();
    return (
        <OptionView
            navigation={navigation}
            progresso="100%"
            sec="9999"
            adicionaltxt={t("js.basic.interactions.valueAssignedToANSWER")}
            pergunta='let RESPOSTA = confirm("Ativar notificações?")'
            opt1="undefined"
            opt2="false"
            opt3="true"
            opt4="0"
            optCerta="opt3"
            txtToHighlight={["RESPOSTA", "ANSWARE", "confirm", "OK", "Ativar notificações?", "Activate notifications?"]}
            aulaSalvar={28}
            Salvar={true}
            navegar="CongratsView"
        />
    )
}