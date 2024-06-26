import { useState } from "react"
import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import * as Notifications from "expo-notifications"
import api from "../../services/service"
import { ActivityIndicator } from "react-native"

Notifications.requestPermissionsAsync()


Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const ResetPwd = ({ navigation, route }) => {
    
    const [newSenha, setNewSenha] = useState('');
    const [confirmNewSenha, setConfirmNewSenha] = useState('');
    const [spinner, setSpinner] = useState(false);
  
    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }



        // const token = await Notifications.getExpoPushTokenAsync()

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Alteracao de senha",
                body: "Sua senha foi redefinida com sucesso",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }

    async function  onPressHandle() {
        if(newSenha != confirmNewSenha)
        {
            alert("As senhas precisam estar identicas")
            return;
        }
   
        setSpinner(true);
await api.put(`Usuario/AlterarSenha?email=${route.params.email}`,{
    senhaNova: newSenha
}).then(() => {
    navigation.replace("Login", {email: route.params.email})
    handleCallNotifications()
}).catch(error => {
    console.log(error);
})
setSpinner(false);

    }

    return (
        <Container>


            <BtnReturn onPress={() => navigation.navigate("Login")}>
                <IconClose source={require("../../assets/close.png")} />
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Redefinir Senha</Title>

            <TextRec>Insira e confirme a sua nova senha</TextRec>

            <Input       secureTextEntry={true} value={newSenha} onChangeText={(txt) => setNewSenha(txt)} placeholder={"Nova senha"} />
            <Input       secureTextEntry={true} value={confirmNewSenha} onChangeText={(txt) => setConfirmNewSenha(txt)} placeholder={"Confirmar nova senha"} />

            <Btn disabled={spinner} onPress={() => onPressHandle()}>
            {spinner ? (

<ActivityIndicator size="large" color="#fff" />

) : (<ButtonTitle>Confimar nova senha</ButtonTitle>)}
            </Btn>
            
        

        </Container>
    )
}