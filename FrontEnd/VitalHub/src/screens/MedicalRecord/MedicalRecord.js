import { useEffect, useState } from "react"
import { ContainerProfile, ContainerScroll, ViewFormat, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, EmailProfile, SubtitleRecord, TextRecord, TitleProfile } from "../../components/Title/Style"
import { Text } from "react-native"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { LinkCancelMargin } from "../../components/Link/Style"
import api, { InseririrProntuario } from "../../services/service"
import { asCalendarConsumer } from "react-native-calendars"

export const MedicalRecord = ({ navigation, route }) => {

    const [recordEdit, setRecordEdit] = useState(true)
    const [dataPaciente, setDataPaciente] = useState();
    const [renderizar, setRenderizar] = useState(false);
    const [descricaoConsulta, setDescricaoConsulta] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [prescricao, setPrescricao] = useState("");


async function AtualizarConsulta(){
    console.log(dataPaciente.id);
try {
    const response = api.put(InseririrProntuario, {
        ConsultaId: dataPaciente.id,
    Descricao: descricaoConsulta,
    Diagnostico: diagnostico,
   
        Medicamento: prescricao
    })


    alert("Prontuário inserido com sucesso");
    setRecordEdit(true)
    
    
} catch (error) {
    console.log(error);
}    
}






    useEffect(() => {
        if (route.params.data && route.params.data.paciente != null) {
            if (route.params.data.receita.medicamento != undefined) {

                setPrescricao(route.params.data.receita.medicamento);
            }
            if (route.params.data.descricao != undefined) {
                setDescricaoConsulta(route.params.data.descricao)
            }
            if(route.params.data.diagnostico != undefined){
                setDiagnostico(route.params.data.diagnostico)
            }

            console.log();
            setDataPaciente(route.params.data)
            setRenderizar(true);
        }
    }, [route.params])
    return (
        renderizar ? (
            <ContainerScroll>


                <ProfileImage source={{ uri: dataPaciente.paciente.idNavigation.foto }} />

                <ContainerProfile>

                    <TitleProfile>{dataPaciente.paciente.idNavigation.nome}</TitleProfile>
                    <ViewTitleRecord>
                        <SubtitleRecord>{dataPaciente.paciente.idade}</SubtitleRecord>
                        <SubtitleRecord>{dataPaciente.paciente.idNavigation.email}</SubtitleRecord>
                    </ViewTitleRecord>

                    {recordEdit ? (
                        <>
                            <BoxInput
                                textLabel={'Descrição da consulta'}
                                placeholder={descricaoConsulta}
                                fieldHeight={150}
                                multiline={true}

                            />
                            <BoxInput
                                textLabel={'Diagnóstico do paciente'}
                                placeholder={diagnostico}
                                fieldHeight={80}
                                multiline={true}
                            />
                            <BoxInput
                                textLabel={'Prescrição médica'}
                                placeholder={prescricao}
                                fieldHeight={150}
                                multiline={true}
                            />
                            <Btn onPress={() => setRecordEdit(false)}>
                                <ButtonTitle>EDITAR</ButtonTitle>
                            </Btn>

                            <LinkCancelMargin onPress={() => { navigation.replace("Main") }}>Cancelar</LinkCancelMargin>
                        </>) : (
                        <>
                            <BoxInput
                                textLabel={'Descrição da consulta'}
                                fieldValue={descricaoConsulta}
                                onChangeText={(text) => setDescricaoConsulta(text)}
                                fieldHeight={150}
                                insertRecord={true}
                                editable={true}
                                multiline={true}
                            />
                            <BoxInput
                                textLabel={'Diagnóstico do paciente'}
                                fieldValue={diagnostico}
                                onChangeText={(text) => setDiagnostico(text)}
                                insertRecord={true}
                                fieldHeight={80}
                                editable={true}
                                multiline={true}
                            />
                            <BoxInput
                                textLabel={'Prescrição médica'}
                                fieldValue={prescricao}
                                onChangeText={(text) => setPrescricao(text)}
                                insertRecord={true}
                                fieldHeight={150}
                                editable={true}
                                multiline={true}
                            />
                            <Btn onPress={() => AtualizarConsulta()}>
                                <ButtonTitle>SALVAR</ButtonTitle>
                            </Btn>

                            <LinkCancelMargin onPress={() => { setRecordEdit(true) }}>Cancelar Edição</LinkCancelMargin></>)}

                </ContainerProfile>
            </ContainerScroll>
        ) : null

    )
}