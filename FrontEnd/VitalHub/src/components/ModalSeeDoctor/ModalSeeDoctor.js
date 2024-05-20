import { Modal } from "react-native"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../Title/Style"
import { ContentModal, ViewModal } from "./Style"
import { ImageDoctor } from "../Images/Style"
import { ViewDataDoctor, ViewTitleRecord } from "../Container/Style"
import { Btn, BtnModalSeeDoctor } from "../Button/Button"
import { LinkCancelMargin } from "../Link/Style"
import { useEffect, useState } from "react"

export const ModalSeeDoctor = ({ navigation, visible, setShowModalSeeDoctor,data, roleUsuario, ...rest }) => {
const [loadPage, setLoadPage] = useState(false);
    const onPressHandle = () => {
        navigation.replace("SeeLocalAppointment",{clinicaId: data.medicoClinica.clinicaId});
        setShowModalSeeDoctor(false)
      }
      async function CapturarLocalizacao() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation)
        }
    }
useEffect(() => {
if( data && data.dataConsulta != null){
    setLoadPage(true)
    CapturarLocalizacao()

}
},[data])
    return (
        loadPage ? 
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
        <ViewModal>
            <ContentModal>
                <ImageDoctor source={{uri: data.medicoClinica.medico.idNavigation.foto}}/>
                <TitleProfile>{data.medicoClinica.medico.idNavigation.nome}</TitleProfile>

                <ViewDataDoctor>
                    <SubtitleRecord>{data.medicoClinica.medico.especialidade.especialidade1}</SubtitleRecord>
                    <SubtitleRecord>{data.medicoClinica.medico.crm}</SubtitleRecord>
                </ViewDataDoctor>

                <BtnModalSeeDoctor onPress={() => {onPressHandle()}}>
                    <ButtonTitle>VER LOCAL DA CONSULTA</ButtonTitle>
                </BtnModalSeeDoctor>

                <LinkCancelMargin onPress={() => {setShowModalSeeDoctor(false);}}>Cancelar</LinkCancelMargin>
            </ContentModal>
        </ViewModal>
    </Modal> : null
)
}