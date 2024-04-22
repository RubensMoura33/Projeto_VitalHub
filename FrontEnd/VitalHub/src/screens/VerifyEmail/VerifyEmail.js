import {useEffect, useRef, useState} from 'react'
import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container, ContentCode } from "../../components/Container/Style"
import { InputCode } from "../../components/Input/Style"
import { LinkResend } from "../../components/Link/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, TextUser, Title } from "../../components/Title/Style"
import api from '../../services/service'

export const VerifyEmail = ({ navigation, route }) => {
    const [codigo, setCodigo] = useState('');
    const inputs = [useRef(null),useRef(null),useRef(null),useRef(null)]

    function focusNextInput(index){
        //Se o index é menor do que a quatidade de campos 
        if(index < inputs.length - 1)
        {
            inputs[index + 1].current.focus()
        }
    }
    function focusPrevInput(index) {
     if(index > 0){
        inputs[index - 1].current.focus();
     }   
    }

    async function ValidarCodigo(){
     console.log();
console.log(`RecuperaraSenha/ValidarSenha?email=${route.params.email}&codigo=${codigo}`);
        await api.post(`RecuperaraSenha/ValidarSenha?email=${route.params.email}&codigo=${codigo}`).then(() => {
            navigation.replace("ResetPwd", {email: route.params.email});
        }).catch(error => {
console.log(error);
        })
    }


    useEffect(() => {
        inputs[0].current.focus();
    },[])
    return (
        <Container>
            
            <BtnReturn onPress={() => navigation.navigate("Login")}>
                 <IconClose  source={require("../../assets/close.png")}/>
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Verifique seu e-mail</Title>

            <TextRec>Digite o código de 4 dígitos enviado para</TextRec>
            <TextUser>{route.params.email}</TextUser>

            <ContentCode>
                {/* <InputCode keyboardType="numeric" placeholder={'0'} maxLength={1}></InputCode> */}
            {
                [0,1,2,3].map((index) => (
                    <InputCode 
                    key={index}
                    ref={inputs[index]}
                     keyboardType="numeric" 
                     placeholder={'0'} 
                     maxLength={1} 
                     caretHidden={true}
                     onChangeText={(text) => {
                        //Verificar se o texto não é vazio (pra voltar ao campo anterior)
if(text == ""){
    focusPrevInput(index)
}else{
    const novoCodigo = [...codigo] //separa os valores em casinhas do array
    novoCodigo[index] = text; //Corrige o valor de acordo com a posicao 
    setCodigo(novoCodigo.join('')) //Juntando todas em uma string 
    focusNextInput(index)
}
                        //Verificar se o campo tem 1 caracter (passa pro próximo campo)
                     }}
                     />
                ))
            }
            </ContentCode>

            <Btn onPress={() => ValidarCodigo()}>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </Btn>

            <LinkResend>Reenviar Código</LinkResend>

        </Container>
    )
} 