
import { BoxInput } from "../../components/BoxInput/Index"
import { ContainerProfile, ContainerScroll, Line, ViewInsertPhoto, ViewSuBTitlePrescription } from "../../components/Container/Style"
import { DoctorImage, PhotoTaked } from "../../components/Images/Style"
import { BtnProfile, SubtitleRecord, TitleCancelPhoto, TitleProfile } from "../../components/Title/Style"
import { BtnCancelPhoto, BtnInsertPhoto } from "../../components/Button/Button"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinkCancelMargin } from "../../components/Link/Style"
import { Image } from "react-native"
import { useEffect, useState } from "react"
import { InputExame } from "../../components/Input/Style"
import api from "../../services/service"


export const SeePrescription = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const [isPhoto, setIsPhoto] = useState(true)
    const [descricaoExame, setDescricaoExame] = useState();

    function onPressPhoto() {
        navigation.navigate("CameraPhoto", { imageProfile: false, getMediaLibrary: true });
        setIsPhoto(true)
    }

    function onPressCancel() {
        setIsPhoto(false);
        route.params = null
    }

    async function inserirExame() {
        console.log(`${route.params}` + " iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        const formData = new FormData();
        
        formData.append("Imagem", {
            uri: photoUri,
            name: `image.${photoUri.split('.').pop()}`,
            type: `image.${photoUri.split('.').pop()}`,
        });

        await api.post('Exame/Cadastrar', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response.data.descricao + "teste");
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error + "error");
        });
    }




    useEffect(() => {
if(photoUri != null){
    inserirExame();
}
    },[photoUri])

    return (
        <ContainerScroll>
            <DoctorImage source={require("../../assets/doctor.png")} />
            <ContainerProfile>

                <TitleProfile>Dr Claudio</TitleProfile>
                <ViewSuBTitlePrescription>
                    <SubtitleRecord>Cliníco geral</SubtitleRecord>
                    <SubtitleRecord>CRM-15286</SubtitleRecord>
                </ViewSuBTitlePrescription>

                <BoxInput
                    multiline={true}
                    textLabel={"Descrição da consulta"}
                    fieldValue={descricaoExame}
                    placeholder={`O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante`}
                    fieldHeight={150}
                />
                <BoxInput
                    multiline={true}
                    textLabel={"Diagnóstico do paciente"}
                    placeholder={`Infecção no ouvido`}
                    fieldHeight={80}
                />
                <BoxInput
                    multiline={true}
                    textLabel={"Prescrição médica"}
                    placeholder={`Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias`}
                    fieldHeight={150}
                />
                <InputExame>Exame medico</InputExame>
                {
                    photoUri && isPhoto ?
                        <PhotoTaked
                            source={{ uri: photoUri }}
                            resizeMode="contain"
                        /> :
                        <BoxInput
                            placeholder={`Nenhuma foto informada`}
                            fieldHeight={150}
                            marginBottom={0}
                        />
                }


                <ViewInsertPhoto>

                    <BtnInsertPhoto onPress={() => { !photoUri ? onPressPhoto() : null }}>
                        <MaterialCommunityIcons name="camera-plus-outline" size={26} color="white" />
                        <BtnProfile>Enviar</BtnProfile>
                    </BtnInsertPhoto>
                    <BtnCancelPhoto onPress={() => onPressCancel()}>
                        <TitleCancelPhoto>Cancelar</TitleCancelPhoto>
                    </BtnCancelPhoto>

                </ViewInsertPhoto>



                <Line></Line>

                <BoxInput
                    placeholder={"Resultado do exame de sangue : tudo normal"}
                    multiline={true}
                    fieldHeight={120}
                    marginBottom={0}
                />

                <LinkCancelMargin onPress={() => { navigation.replace("Main") }}>Voltar</LinkCancelMargin>

            </ContainerProfile>
        </ContainerScroll>
    )
}