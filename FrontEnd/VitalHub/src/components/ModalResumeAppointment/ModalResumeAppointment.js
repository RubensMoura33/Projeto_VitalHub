import { Modal } from "react-native"
import { ContentModal, TextData, TitleData, ViewData, ViewModal } from "./Style"
import { ButtonTitle, SubTitleModalResume, TitleProfile } from "../Title/Style"
import { LinkCancelMargin } from "../Link/Style"
import { Btn } from "../Button/Button"

import * as Notifications from "expo-notifications"
import { useEffect, useState } from "react"
import api from "../../services/service"
import { userDecodeToken } from "../../Utils/Auth"

Notifications.requestPermissionsAsync()

Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const ModalResumeAppointment = ({ agendamento, dataConsulta, horarioConsulta, navigation, visible, setShowModalResume, ...rest }) => {

    const [renderizar, setRenderizar] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
        if (agendamento && agendamento.medicoLabel != null) {
            setRenderizar(true)
        }
    }, [agendamento])

    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }

        // const token = await Notifications.getExpoPushTokenAsync()g

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta Agendada",
                body: "Sua consulta foi agendada com sucesso, podendo ser vizualizada em Agendadadas.",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }

    async function onPressHandle() {
        await setShowModalResume(false)
        navigation.replace("Main")
        handleCallNotifications()
    }

    async function profileLoad(){
        const token = await userDecodeToken();

        if(token)   
            setProfile(token)
    }

    async function PostConsulta(){
        await api.post("/Consultas/Cadastrar", {
            ...agendamento,
            pacienteId : profile.id,
            situacaoId : "DFF3E799-EEB1-4DEE-B3BC-92DA062FC8F1"
        }).then( async response => {
            await setShowModalResume(false);

            navigation.replace("Main");
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        profileLoad()
    },[])

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
            {renderizar ? (
                <ViewModal>
                    <ContentModal>
                        <TitleProfile>Agendar Consulta</TitleProfile>

                        <SubTitleModalResume>Consulte os dados selecionados para a sua consulta</SubTitleModalResume>

                        <ViewData fieldHeight={50}>
                            <TitleData>Data da consulta</TitleData>
                            <TextData>{dataConsulta} {horarioConsulta}</TextData>
                        </ViewData>
                        <ViewData fieldHeight={80}>
                            <TitleData>Médico(a) da consulta</TitleData>
                            <TextData>{agendamento.medicoLabel}</TextData>
                            <TextData>{agendamento.especialidade}</TextData>
                        </ViewData>
                        <ViewData fieldHeight={50}>
                            <TitleData>Local da consulta</TitleData>
                            <TextData>{agendamento.localizacao}</TextData>
                        </ViewData>
                        <ViewData fieldHeight={50}>
                            <TitleData>Tipo da consulta</TitleData>
                            <TextData>{agendamento.prioridadeLabel}</TextData>
                        </ViewData>
                        <Btn onPress={() => PostConsulta()}>
                            <ButtonTitle>CONFIRMAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => setShowModalResume(false)}>Cancelar</LinkCancelMargin>
                    </ContentModal>
                </ViewModal>
            ) : null}
        </Modal>

    )
}