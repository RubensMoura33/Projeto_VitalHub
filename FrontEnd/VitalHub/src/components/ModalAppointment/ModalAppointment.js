import { Image, Modal, Text } from "react-native"
import { ButtonTitle, TitleProfile } from "../Title/Style"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"
import { ButtonModal, Cancel, ContentModal, ImagePaciente, TextAge, TextEmail, ViewData, ViewModal } from "./Style"
import { useEffect, useState } from "react"
import { ProfileImage } from "../Images/Style"

export const ModalAppointment = ({ setShowModalAppointment, navigation, visible, data, ...rest }) => {

    const onPressHandler = () => {
        navigation.replace("InsertRecord", data);
        setShowModalAppointment(false)
    };

    const [dataPaciente, setDataPaciente] = useState();
    useEffect(() => {
        if (data && data.dataConsulta &&  data.paciente.idNavigation.foto != null) {
            
            setDataPaciente(true);
        }
    }, [data])
    return (
        dataPaciente ?
            <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
                <ViewModal>
                    <ContentModal>
                        <ImagePaciente  source={{uri: data.paciente.idNavigation.foto}} />

                        <TitleProfile>{data.paciente.idNavigation.nome}</TitleProfile>

                        <ViewData>
                            <TextAge>{data.paciente.idade}</TextAge>
                            <TextEmail>{data.paciente.idNavigation.email}</TextEmail>
                        </ViewData>

                        <ButtonModal onPress={() => { onPressHandler() }} >
                            <ButtonTitle>INSERIR PRONTUARIO</ButtonTitle>
                        </ButtonModal>

                        <Cancel onPress={() => setShowModalAppointment(false)}>Cancelar</Cancel>

                    </ContentModal>
                </ViewModal>
            </Modal>
            : null
    )
}

