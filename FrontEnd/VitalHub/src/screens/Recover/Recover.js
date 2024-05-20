import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn, BtnReturn, IconReturn } from "../../components/Button/Button"
import { useState } from "react"
import api, { RecuperarSenha } from '../../services/service'
import { ActivityIndicator } from "react-native"

export const Recover = ({navigation}) => {
    const[email, setEmail] = useState('');
    const [spinner, setSpinner] = useState(false);

    async function EnviarEmail(){
        setSpinner(true);
        await api.post(`${RecuperarSenha}${email}`)
        .then(() => {
            navigation.replace("VerifyEmail", {email})  
        }).catch(error => {
           console.warn("Email inválido!");
        })


        setSpinner(false);
    }
    return (
        <Container>
            
            <BtnReturn onPress={() => navigation.navigate("Login")}>
                 <IconReturn source={require("../../assets/return.png")}/>
            </BtnReturn>
           
            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Recuperar Senha</Title>

            <TextRec>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextRec>

            <Input
            onChangeText={(txt) => setEmail(txt)}
            placeholder={"Usuário ou E-mail"} />

            <Btn disabled={spinner} onPress={() => EnviarEmail()}>
            {spinner ? (

<ActivityIndicator size="large" color="#fff" />

) : (<ButtonTitle>CONTINUAR</ButtonTitle>)}

            </Btn>  
            


        </Container>
    )
}