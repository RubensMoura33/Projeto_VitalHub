import { ActivityIndicator, ActivityIndicatorBase, Text } from "react-native"
import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Link/Style"
import * as Notifications from "expo-notifications"
import { useState } from "react"
import api, { PostUser } from "../../services/service"

Notifications.requestPermissionsAsync()

Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const Register = ({ navigation }) => {

    const [spinner, setSpinner] = useState(false);
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [cep, setCep] = useState();
    const[logradouro, setLograoduro] = useState()
    const[numero, setNumero] = useState()
    const[cidade, setCidade] = useState()
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    const [foto, setFoto] = useState();

    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }

        0

        // const token = await Notifications.getExpoPushTokenAsync()

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Registro de Usuario",
                body: "Sua conta foi criada com sucesso, bem vindo",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }

    async function Register() {
        setSpinner(spinner ? false : true);
        if (confirmarSenha === senha) {
            var promise = await api.post(PostUser,
                {
                    nome: nome,
                    email: email,
                    senha: senha,
                    idTipoUsuario: "17D93BF6-DEF2-4055-84FB-B4DF80E25DA4"
                })
                navigation.replace("Login")
        }
        else{
            console.log(error + " erro senai");
        }


    }

    return (
        <Container>
            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Criar conta</Title>

            <TextRec>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextRec>

            <Input placeholder={"Nome"} value={nome} onChangeText={setNome} />
            <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
            <Input placeholder={"Senha"} value={senha} onChangeText={setSenha} />
            <Input placeholder={"Confirmar senha"} value={confirmarSenha} onChangeText={setConfirmarSenha} />

            <Btn disabled={spinner} onPress={() => Register()}>
                {spinner ? (

                    <ActivityIndicator size="large" color="#fff" />

                ) : (<ButtonTitle>CADASTRAR</ButtonTitle>)}

            </Btn>

            <LinkCancel onPress={() => navigation.replace("Login")}>Cancelar</LinkCancel>

        </Container>
    )
}