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

export const Profile = ({ navigation }) => {

    const [profileEdit, setProfileEdit] = useState(false);
    const [especialidade, setEspecialidade] = useState();
    const [especialidades, setEspecialidades] = useState();

    const [user, setUser] = useState({});

    async function logOut() 
    {
        AsyncStorage.removeItem("token");
        navigation.replace("Login")
    }
    async function loadData() {
        const token = await  userDecodeToken();
        setUser(token);
    }

    useEffect(() => {
     const loadDados = async () => {

     }

loadData();
    },[])
    return (
        <ContainerScroll>

            {user.role == "Medico" ? (
<>
<ProfileImage source={require("../../assets/photo.png")} />

<ContainerProfile>
    <TitleProfile>{user.name}</TitleProfile>
    <SubTitleProfile>{user.email}</SubTitleProfile>


    <BoxInput
        textLabel={'CRM'}
        placeholder={'859********'}
    />
   


<InputSelect 
textButton="Selecionar Especialidade"
handleSelectedFn={setEspecialidade}

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
            ) : null}
            {/* {!profileEdit ? (
                <>
                   
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>
                        <TitleProfile>{user.name}</TitleProfile>
                        <SubTitleProfile>{user.email}</SubTitleProfile>

                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            placeholder={'04/05/1999'}

                        />
                        <BoxInput
                            textLabel={'CPF'}
                            placeholder={'859********'}
                        />
                        <BoxInput
                            textLabel={'Endereço'}
                            placeholder={'Rua Vicenso Silva, 987'}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={'06548-909'}
                                fieldWidth={'45'}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={'Moema-SP'}
                                fieldWidth={'45'}
                            />
                        </ViewFormat>

                        <Btn onPress={() => setProfileEdit(true)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => logOut()}>
                            <ButtonTitle>SAIR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => navigation.replace("Main")}>Voltar</LinkCancelMargin>
                    </ContainerProfile>
                </>
            ) : (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />


                    <ViewTitle>
                        <TitleProfile>{user.name}</TitleProfile>
                        <SubTitleProfile>{user.email}</SubTitleProfile>
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
            )} */}
              
        </ContainerScroll>
    )
}