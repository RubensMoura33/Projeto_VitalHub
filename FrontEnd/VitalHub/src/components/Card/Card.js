import { Image, Text } from "react-native";
import { ButtonCard, ButtonText, ClockCard, ContainerCard, ContentCard, DataProfile, ImagePoint, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from "./Style"
import { AntDesign } from '@expo/vector-icons';




export const Card = ({
    status = "Pendentes",
    id,
    foto,
    onPressCancel,
    onPressAppointment,
    tipoUser,
    name, age, hour, typeAppointment, crm}) => {

    return (
        <ContainerCard>
            {/* Imagem do Card */}
            <ProfileImage source={{uri: foto}} />


            <ContentCard>
                <DataProfile>   
                    <ProfileName>{tipoUser == "Paciente" ? 'Dr(a) ' + name : name}</ProfileName>
                    <ProfileData>
                        <TextAge>{tipoUser == "Paciente" ? crm : age + ' anos'} </TextAge>
                        <ImagePoint source={require('../../assets/point.png')} />
                        <TextBold>{typeAppointment}</TextBold>
                    </ProfileData>
                </DataProfile>
                <ViewRow>
                    <ClockCard status={status}>
                        <AntDesign name="clockcircle" size={18} color={status == "Pendentes" ? '#49B3BA' : '#4E4B59'} />
                        <TextBold status={status}>{new Date(hour).toLocaleDateString("pt-BR")}</TextBold>
                    </ClockCard>


                    {/* valida e mostra o tipo de botao conforme a status */}

                    {
                        status == "Cancelados" ? (
                            <>
                            </>
                        ) : status == "Pendentes" ? (
                            <ButtonCard onPress={onPressCancel} >
                                <ButtonText status={status}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonText status={status}>Ver Prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }

                </ViewRow>
            </ContentCard>

        </ContainerCard>
    )
}