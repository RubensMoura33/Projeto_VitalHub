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


async function UserSave(){


try {
    const promise  = await api.put(InseririrProntuario, {
        Id: route.params.id,
        descricao: descricaoConsulta,
        Diagnostico: dignostico,
        Receita:{
            Medicamento: prescricao
        }


    });
    navigation.replace("Main")

} catch (error) {
    console.log(error);
}
}

    useEffect(() => {

    },[route.params])
    return (
        <ContainerScroll>
            <ProfileImage source={require("../../assets/photo.png")} />

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
                 insertRecord={true}
                onChangeText={setDescricaoCounsulta}
                 multiline={true}
                />
                <BoxInput
                onChangeText={setDiagnostico}
                 textLabel={'Diagnóstico do paciente'}
                 placeholder={'Diagnóstico'}
                 fieldHeight={80}
                 insertRecord={true}
                 multiline={true}
                />
                <BoxInput
                onChangeText={setPrescricao}
                 textLabel={'Prescrição médica'}
                 placeholder={'Prescrição medica'}
                 fieldHeight={150}
                 insertRecord={true}
                 multiline={true}
                />

                <Btn onPress={() => UserSave()}>
                    <ButtonTitle>SALVAR</ButtonTitle>
                </Btn>

                <LinkCancelMargin onPress={() => navigation.replace("Main")}>Cancelar</LinkCancelMargin>
            </ContainerProfile>
        </ContainerScroll>
    )
}