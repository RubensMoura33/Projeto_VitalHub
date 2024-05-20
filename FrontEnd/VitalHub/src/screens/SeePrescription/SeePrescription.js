
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
import { LinearGradient } from "expo-linear-gradient"


export const SeePrescription = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const [isPhoto, setIsPhoto] = useState(true)
    const [descricaoExame, setDescricaoExame] = useState();
    const [dataConsulta, setDataConsulta] = useState();
    const [renderizar, setRenderizar] = useState(false);
    const [descricaoConsulta, setDescricaoConsulta] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [prescricao, setPrescricao] = useState("");

    function onPressPhoto() {
        navigation.navigate("CameraPhoto", { imageProfile: false, getMediaLibrary: true });
        setIsPhoto(true)
    }

    function onPressCancel() {
        setIsPhoto(false);
        route.params = null
    }

   async function getExame(){

    const response = await api.get(`Exame/BuscarPorIdConsulta?idConsulta=${route.params.data.id}`)
    setDescricaoExame(response.data[0].descricao)
   }
    useEffect(() => {
        if (route.params.data != null) {
            if (route.params.data.receita.medicamento != undefined) {
                console.log(route.params.id);
                setPrescricao(route.params.data.receita.medicamento);
            }
            if (route.params.data.descricao != undefined) {
                setDescricaoConsulta(route.params.data.descricao)
            }
            if(route.params.data.diagnostico != undefined){
                setDiagnostico(route.params.data.diagnostico)
            }


        getExame();
            setRenderizar(true)
            setDataConsulta(route.params.data)
        }
    }, [route])

    async function inserirExame() {

        const formData = new FormData();

        formData.append("Imagem", {
            uri: photoUri,
            name: `image.${photoUri.split('.').pop()}`,
            type: `image/${photoUri.split('.').pop()}`,
        });
        formData.append("ConsultaId", dataConsulta.id)

      



        await api.post('Exame/Cadastrar', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }

        }).then(response => {
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error);
        });
    }




    useEffect(() => {
        if (photoUri != null) {
            inserirExame();
        }
    }, [photoUri])

    return (
    renderizar ? (
     <ContainerScroll>
        <DoctorImage source={{uri : dataConsulta.medicoClinica.medico.idNavigation.foto}} />
        <ContainerProfile>

                <TitleProfile>{`Dr(a) ${dataConsulta.medicoClinica.medico.idNavigation.nome}`}</TitleProfile>
            <ViewSuBTitlePrescription>
                <SubtitleRecord>{dataConsulta.medicoClinica.medico.especialidade.especialidade1}</SubtitleRecord>
                <SubtitleRecord>{dataConsulta.medicoClinica.medico.crm}</SubtitleRecord>
            </ViewSuBTitlePrescription>

            <BoxInput
                multiline={true}
                textLabel={"Descrição da consulta"}
                fieldValue={descricaoConsulta}
                placeholder={`O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante`}
                fieldHeight={150}
            />
            <BoxInput
                multiline={true}
                textLabel={"Diagnóstico do paciente"}
                placeholder={diagnostico}
                fieldHeight={80}
            />
            <BoxInput
                multiline={true}
                textLabel={"Prescrição médica"}
                placeholder={prescricao}
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
                fieldValue={descricaoExame}
                marginBottom={0}
            />

            <LinkCancelMargin onPress={() => { navigation.replace("Main") }}>Voltar</LinkCancelMargin>

        </ContainerProfile>
    </ContainerScroll>) : null
       
    )
}