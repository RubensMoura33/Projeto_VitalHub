import { ActivityIndicator, ActivityIndicatorBase, Text } from "react-native"
import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Link/Style"
import * as Notifications from "expo-notifications"
import { useEffect, useState } from "react"
import api, { PostUser, GetIdTipoUsuario } from "../../services/service"

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
    const [idTipoUsuario, setIdTipoUsuario] = useState();

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
        if (confirmarSenha === senha) {
            const formData = new FormData();
            formData.append('Nome', nome);
            formData.append('Email', email);
            formData.append('Senha', senha);
            formData.append('IdTipoUsuario', idTipoUsuario);
            try {
                await api.post("Pacientes", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                navigation.replace("Login");
                handleCallNotifications();
            } catch (error) {
                
            }
        }
        else {
            Alert.alert("Senha de confirmacao nao corresponde a sua senha")
        }

    }

    useEffect(() => {
const loadData = async () => {
    const promise = await api.get(`${GetIdTipoUsuario}?tipoUsuario=Paciente`);
    console.log(promise.data);
    setIdTipoUsuario(promise.data);
}
loadData();
    },[])

    return (
        <Container>
            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Criar conta</Title>

            <TextRec>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextRec>

            <Input placeholder={"Nome"} value={nome} onChangeText={setNome} />
            <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
            <Input placeholder={"Senha"} value={senha} onChangeText={setSenha} secureTextEntry={true}/>
            <Input placeholder={"Confirmar senha"} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true}/>

            <Btn disabled={spinner} onPress={() => Register()}>
                {spinner ? (

                    <ActivityIndicator size="large" color="#fff" />

                ) : (<ButtonTitle>CADASTRAR</ButtonTitle>)}

            </Btn>

            <LinkCancel onPress={() => navigation.replace("Login")}>Cancelar</LinkCancel>

        </Container>
    )
}