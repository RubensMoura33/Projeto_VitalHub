import { Button, Text } from "react-native"
import { ContainerProfile, ContainerSafeEdit, ContainerScroll, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn, ButtonGoOut } from "../../components/Button/Button"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { userDecodeToken } from "../../Utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import InputSelect from "../../components/InputSelect/InputSelect"
import api, { especialidadeResource, buscarPacienteResource, medicosResource } from "../../services/service"

export const Profile = ({ navigation }) => {

    const [profileEdit, setProfileEdit] = useState(false);
    const [especialidade, setEspecialidade] = useState();
    const [especialidades, setEspecialidades] = useState();
    const [dataUser, setDataUser] = useState({});
    const [endereco, setEndereco] = useState({});

    const [role, setRole] = useState({});

    async function logOut() {
        AsyncStorage.removeItem("token");
        navigation.replace("Login")
    }
    
    async function loadData() {
        const token = await userDecodeToken();
        setRole(token);


  
        var response = null

        if(token.role == "Medico")
        {

        }else{
            try {
                response = await api.get(`${buscarPacienteResource}?id=${token.id}`)
                  
            } catch (error) {
                console.log(error + " erro senai");
            }
        }

        setDataUser(response.data);
        setEndereco(response.data.endereco);
        
        
    }


    useEffect(() => {
        loadData();
    }, [])

    return (
        <ContainerScroll>

            {role.role == "Medico" && !profileEdit ? (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>


                        <BoxInput
                            textLabel={'CRM'}
                            placeholder={'859********'}
                        />



                        <InputSelect
                            textButton="Selecionar Especialidade"
                            handleSelectedFn={setEspecialidade}
                            data={especialidade}
                        />
                        <Btn onPress={() => setProfileEdit(true)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => logOut()}>
                            <ButtonTitle>SAIR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => navigation.replace("Main")}>Voltar</LinkCancelMargin>
                    </ContainerProfile>
                </>
            ) : role.role == "Medico" && profileEdit ? (

                <>
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>


                        <BoxInput
                            textLabel={'CRM'}
                            placeholder={'859********'}
                        />



                        <InputSelect
                            textButton="Selecionar Especialidade"
                            handleSelectedFn={setEspecialidade}
                            data={especialidade}
                        />
                        <Btn onPress={() => setProfileEdit(false)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => logOut()}>
                            <ButtonTitle>SAIR</ButtonTitle>
                        </Btn>
                       <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerProfile>
                </>

            ) : role.role == "Paciente" && !profileEdit ? (<>
                <ProfileImage source={require("../../assets/photo.png")} />


                <ViewTitle>
                    <TitleProfile>{role.name}</TitleProfile>
                    <SubTitleProfile>{role.email}</SubTitleProfile>
                </ViewTitle>

                <ContainerSafeEdit>
                     <BoxInput
                        textLabel={'Data de nascimento:'}
                        fieldValue={new Date(dataUser.dataNascimento).toLocaleDateString("pt-BR")}
                        editable={false}

                    />
              
                    <BoxInput
                        textLabel={'CPF'}
                        fieldValue={dataUser.cpf}
                        editable={false}
                    />
                              
                    <BoxInput
                        textLabel={'Endereço'}
                        fieldValue={endereco.logradouro}
                        editable={false}
                    />
                 
                    <ViewFormat>
                        <BoxInput
                            textLabel={'Cep'}
                           fieldValue={endereco.cep}
                            fieldWidth={'45'}
                            editable={false}
                        />
                        <BoxInput
                            textLabel={'Cidade'}
                            placeholder={'Moema-SP'}
                            fieldWidth={'45'}
                            editable={false}

                        />
                    </ViewFormat>

                    <Btn onPress={() => setProfileEdit(true)}>
                        <ButtonTitle>EDITAR</ButtonTitle>
                    </Btn>
                    <Btn onPress={() => logOut()}>
                        <ButtonTitle>SAIR</ButtonTitle>
                    </Btn>
                    
                    <LinkCancelMargin onPress={() => navigation.replace("Main")}>Voltar</LinkCancelMargin>

                </ContainerSafeEdit>
            </>) : (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />


                    <ViewTitle>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>
                    </ViewTitle>

                    <ContainerSafeEdit>
                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            placeholder={'04/05/1999'}
                            editable={true}

                        />
                        <BoxInput
                            textLabel={'CPF'}
                            placeholder={'859********'}
                            editable={true}
                        />
                        <BoxInput
                            textLabel={'Endereço'}
                            fieldValue={'Rua Vicenso Silva, 987'}
                            editable={true}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={'06548-909'}
                                fieldWidth={'45'}
                                editable={true}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={'Moema-SP'}
                                fieldWidth={'45'}
                                editable={true}

                            />
                        </ViewFormat>

                        <Btn onPress={() => setProfileEdit(false)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => logOut()}>
                            <ButtonTitle>SAIR</ButtonTitle>
                        </Btn>
                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerSafeEdit>

                </>
            )}


        </ContainerScroll>
    )
}
