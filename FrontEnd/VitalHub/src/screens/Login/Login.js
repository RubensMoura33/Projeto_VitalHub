
import { Container, ContentAccount } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonGoogleTitle, ButtonTitle, ImgGoogle, TextAccount, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { LinkCreate, LinkMedium } from "../../components/Link/Style"
import { Btn, BtnGoogle } from "../../components/Button/Button"
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api, { loginResource } from "../../services/service"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("medico@medico.com");
    const [senha, setSenha] = useState("123");
    const [user, setUser] = useState({
        email: "",
        senha: ""
    });


    async function handleSubmit() {


try {
    
    const response = await api.post(loginResource, {
            email: email,
            senha: senha
        })
  await AsyncStorage.setItem('token',JSON.stringify(response.data) );
  navigation.replace("Main")

} catch (error) {
    console.log(error + " aqui");
} 
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>

                <Logo source={require('../../assets/logo.png')} />

                <Title>Entrar ou criar conta</Title>



                <Input
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                    // onChange={event => event.nativeEnvent.text}
                    placeholder={"Usuário ou E-mail"} />
                <Input
                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                      
                    placeholder={"Senha"} />

                <LinkMedium onPress={() => navigation.replace("Recover")} >Esqueceu sua senha?</LinkMedium>


                <Btn onPress={() => handleSubmit()}>
                    <ButtonTitle>ENTRAR</ButtonTitle>
                </Btn>

                <BtnGoogle>
                    <AntDesign name="google" size={21} color="#496BBA" />
                    <ButtonGoogleTitle>ENTRAR COM GOOGLE</ButtonGoogleTitle>
                </BtnGoogle>

                <ContentAccount>
                    <TextAccount>Nao tem Conta?</TextAccount>
                    <LinkCreate onPress={() => navigation.replace("Register")}>Crie uma conta agora!</LinkCreate >

                </ContentAccount>

            </Container>
        </TouchableWithoutFeedback>
    )
}   