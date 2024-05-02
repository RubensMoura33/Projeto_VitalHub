import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn, BtnReturn, IconReturn } from "../../components/Button/Button"
import { useState } from "react"
import api, { RecuperarSenha } from '../../services/service'

export const Recover = ({navigation}) => {
    const[email, setEmail] = useState('');

    async function EnviarEmail(){
        await api.post(`${RecuperarSenha}${email}`)
        .then(() => {
            navigation.replace("VerifyEmail", {email})  
        }).catch(error => {
            console.log(error);
        })
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

            <Btn onPress={() => EnviarEmail()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>  

        </Container>
    )
}