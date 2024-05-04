import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { ContainerProfile, ContainerScroll, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { LinkCancelMargin } from "../../components/Link/Style"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../../components/Title/Style"
import api, { InseririrProntuario } from "../../services/service"

export const InsertRecord = ({navigation, route}) => {

    const[descricaoConsulta, setDescricaoCounsulta] = useState();
    const[dignostico, setDiagnostico] = useState();
    const[prescricao, setPrescricao] = useState();
    const[editSave, setEditSave] = useState(true);
  

async function loadData(){     

     const response = await api.get(`Consultas/BuscarPorId?id=${route.params.id}`);

     if(response.data.descricao != null && response.data.descricao != undefined){
        setDescricaoCounsulta(response.data.descricao)
     }
     if(response.data.diagnostico != null && response.data.diagnostico != undefined){
        setDiagnostico(response.data.descricao)
     }

}
    

    useEffect(() => {
loadData();
    },[])

async function UserSave(){
setEditSave(true);

try {
    const promise  = await api.put(InseririrProntuario, {
        ConsultaId: route.params.id,
        Descricao: descricaoConsulta,
        Diagnostico: dignostico

    });

    alert("Prontuário inserido com sucesso!")
    navigation.replace("Main")

} catch (error) {
    console.log(error);
}
}

    useEffect(() => {

    },[route.params])
    return (
        <ContainerScroll>
            <ProfileImage source={{uri: route.params.paciente.idNavigation.foto}} />

{!editSave ? (
    <ContainerProfile>
                <TitleProfile>{route.params.paciente.idNavigation.nome}</TitleProfile>
                <ViewTitleRecord>
                    <SubtitleRecord>{route.params.paciente.idade} anos</SubtitleRecord>
                    <SubtitleRecord>{route.params.paciente.idNavigation.email}</SubtitleRecord>
                </ViewTitleRecord>

                <BoxInput
                 textLabel={'Descrição da consulta'}
                 placeholder={'Descrição'}
                 fieldHeight={150}
                 editable={true}
                 insertRecord={true}
                 fieldValue={descricaoConsulta}
                 onChangeText={setDescricaoCounsulta}
                 multiline={true}
                />
                <BoxInput
                fieldValue={dignostico}
                onChangeText={setDiagnostico}
                 textLabel={'Diagnóstico do paciente'}
                 placeholder={'Diagnóstico'}
                 fieldHeight={80}
                 insertRecord={true}
                 editable={true}
                 multiline={true}
                />
                <BoxInput
                fieldValue={prescricao}
                onChangeText={setPrescricao}
                 textLabel={'Prescrição médica'}
                 placeholder={'Prescrição medica'}
                 fieldHeight={150}
                 editable={true}
                 insertRecord={true}
                 multiline={true}
                />

                <Btn onPress={() => UserSave()}>
                    <ButtonTitle>SALVAR</ButtonTitle>
                </Btn>

                <LinkCancelMargin onPress={() => navigation.replace("Main")}>Cancelar</LinkCancelMargin>
            </ContainerProfile>
) : ( 
<ContainerProfile>
    <TitleProfile>{route.params.paciente.idNavigation.nome}</TitleProfile>
    <ViewTitleRecord>
        <SubtitleRecord>{route.params.paciente.idade} anos</SubtitleRecord>
        <SubtitleRecord>{route.params.paciente.idNavigation.email}</SubtitleRecord>
    </ViewTitleRecord>

    <BoxInput
     textLabel={'Descrição da consulta'}
     placeholder={'Descricao'}
     fieldHeight={150}
     editable={false}
fieldValue={descricaoConsulta}
     multiline={true}
    />
    <BoxInput

     textLabel={'Diagnóstico do paciente'}
     placeholder={'Diagnóstico'}
     fieldValue={dignostico}
     fieldHeight={80}
     editable={false}
     multiline={true}
    />
    <BoxInput

     textLabel={'Prescrição médica'}
     placeholder={'Prescrição medica'}
     fieldHeight={150}
     editable={false}

     multiline={true}
    />

    <Btn onPress={() => setEditSave(false)}>
        <ButtonTitle>EDITAR</ButtonTitle>
    </Btn>

    <LinkCancelMargin onPress={() => navigation.replace("Main")}>Cancelar</LinkCancelMargin>
</ContainerProfile>
)}
            
        </ContainerScroll>
    )
}