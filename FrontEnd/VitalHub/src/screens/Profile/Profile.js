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
import { MaterialCommunityIcons } from "@expo/vector-icons"
import api, { especialidadeResource, buscarPacienteResource, medicosResource, GetSpecialtiesResource, buscarMedicoResource, PostUser, GetIdTipoUsuario } from "../../services/service"
import { ButtonCamera, ContainerImage } from "./Style"

export const Profile = ({ navigation, route }) => {

    const [profileEdit, setProfileEdit] = useState(false);
    const [especialidade, setEspecialidade] = useState();
    const [logradouro, setLogradouro] = useState();
    const [cep, setCep] = useState();
    const [especialidades, setEspecialidades] = useState([]);
    const [dataUser, setDataUser] = useState({});
    const [endereco, setEndereco] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [crm, setCrm] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [numero, setNumero] = useState()
    const [cidade, setCidade] = useState()
    const [nome, setNome] = useState();
    const [idTipoUsuario, setIdTipoUsuario] = useState();
    const [dataTeste, setDataTeste] = useState()
    //Configuracao token

    const [role, setRole] = useState({});
    const [token, setToken] = useState()

    const { photoUri } = route.params || {};
    const[isPhoto,setIsPhoto] = useState(true)
    async function logOut() {
        AsyncStorage.removeItem("token");
        navigation.replace("Login")
    }


    async function loadData() {
        const token = await userDecodeToken();
        setRole(token);
        setToken(token.token)

        var response = null

        if (token.role == "Medico") {
            response = await api.get(`${buscarMedicoResource}?id=${token.id}`)
            setEspecialidade(response.data.especialidade.especialidade1)
            setLogradouro(response.data.endereco.logradouro)
            setCep(response.data.endereco.cep)
            setCrm(response.data.crm)
        } else {
            try {
                response = await api.get(`${buscarPacienteResource}?id=${token.id}`)
                setDataNascimento(response.data.dataNascimento)
                setDataTeste(new Date(response.data.dataNascimento).toLocaleDateString("pt-BR"))
                setCpf(response.data.cpf)
                setLogradouro(response.data.endereco.logradouro)
                setCep(response.data.endereco.cep)
                setCidade(response.data.endereco.cidade)
            } catch (error) {
                console.log(error + " erro senai");
            }
        }

        setDataUser(response.data);
        setEndereco(response.data.endereco);

    }

    async function updatePatient() {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await api.put(PostUser, {

                rg: rg,
                cpf: cpf,
                dataNascimento: dataNascimento,
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                cidade: cidade,
                nome: nome,
                email: dataUser.idNavigation.email

            }, config)
            setProfileEdit(false)

        } catch (error) {
            console.log(error + " erro senai");
        }
    }

    async function updateDoctor() {
        try {
            console.log(token);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await api.put(medicosResource, {

                crm: crm,
                cep: cep,
                logradouro: logradouro,
                especialidadeId: "5dfc3955-7fd8-47d6-96d9-f9753331fb8e",
                numero: numero

            }, config)
            setProfileEdit(false)

        } catch (error) {
            console.log(error + " erro senai");
        }
    }

    async function GetSpecialties() {
        try {

            var response = await api.get(GetSpecialtiesResource)
            setEspecialidades(response.data)

        } catch (error) {
            console.log(error + " erro senai");
        }

    }

    //DEPARA
    function dePara(retornoApi) {
        let arrayOptions = [];
        retornoApi.forEach((e) => {
            arrayOptions.push({ value: e.id, text: e.especialidade1 });
        });
        // let arrayText = [];
        // arrayOptions.forEach((e) => {
        //     arrayText.push({text: e.text})
        // })
        console.log(arrayOptions);
        return arrayOptions;
    }


    function onPressPhoto() {
        console.log("estou aqui");
        navigation.navigate("CameraPhoto", {imageProfile: true, getMediaLibrary: true });
        setIsPhoto(true)
    }

    useEffect(() => {
       
        GetSpecialties();
    }, [])



    useEffect(() => {
        loadData();
        if(photoUri ){
            AlterarFotoPerfil();
        }
    },[photoUri])


    async function AlterarFotoPerfil(){
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: photoUri ,
            name:`image.${photoUri.split(".")[1]}` ,
            type: `image/${photoUri.split(".")[1]}`
        })
   
        console.log(role.id + " iddddddd");
        console.log(`Usuario/AlterarFotoPerfil?id=${role.id}`);
        await api.put(`Usuario/AlterarFotoPerfil?id=${role.id}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <ContainerScroll>

            {role.role == "Medico" && !profileEdit ? (
                <>
                    <ContainerImage>
                        <ProfileImage source={require("../../assets/photo.png")} />

                    </ContainerImage>

                    <ContainerProfile>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>


                        <BoxInput
                            textLabel={'CRM'}
                            placeholder={'859********'}
                            fieldValue={crm}
                        />

                        <BoxInput
                            textLabel={'Logradouro'}
                            placeholder={'Insira um logradouro'}
                            fieldValue={logradouro}
                        />
                        <BoxInput
                            textLabel={'CEP'}
                            placeholder={'Insira um CEP'}
                            fieldValue={cep}
                        />

                        <BoxInput
                            textLabel={'Especialidade'}
                            placeholder={'Insira uma especialidade'}
                            fieldValue={especialidade}
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
                            fieldValue={crm}
                            editable={true}
                            insertRecord={true}
                            onChangeText={setCrm}
                        />


                        <BoxInput
                            textLabel={'Logradouro'}
                            placeholder={'Insira um logradouro'}
                            fieldValue={logradouro}
                            editable={true}
                            onChangeText={setLogradouro}
                        />

                        <BoxInput
                            textLabel={'CEP'}
                            fieldValue={cep}
                            editable={true}
                            onChangeText={setCep}
                        />
                        <InputSelect
                            textButton="Selecionar Especialidade"
                            handleSelectedFn={setEspecialidade}
                            data={dePara(especialidades)}
                        />

                        <Btn onPress={() => updateDoctor()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => logOut()}>
                            <ButtonTitle>SAIR</ButtonTitle>
                        </Btn>
                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerProfile>
                </>

            ) : role.role == "Paciente" && !profileEdit ? (<>

                <ContainerImage>

                    <ProfileImage source={photoUri != null ? {uri: photoUri} : require("../../assets/photo.png")} />
                   

                    <ViewTitle>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>
                    <ButtonCamera onPress={() => {!photoUri ? onPressPhoto() : null}}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb"/>
                    </ButtonCamera>
                    </ViewTitle>
                </ContainerImage>

                <ContainerSafeEdit>
                    <BoxInput
                        textLabel={'Data de nascimento:'}
                        fieldValue={new Date(dataNascimento).toLocaleDateString("pt-BR")}
                        editable={false}

                    />

                    <BoxInput
                        textLabel={'CPF'}
                        fieldValue={cpf}
                        editable={false}
                    />

                    <BoxInput
                        textLabel={'Logradouro'}
                        fieldValue={logradouro}
                        editable={false}
                    />

                    <ViewFormat>
                        <BoxInput
                            textLabel={'Cep'}
                            fieldValue={cep}
                            fieldWidth={'45'}
                            editable={false}
                        />
                        <BoxInput
                            textLabel={'Cidade'}
                            fieldWidth={'45'}
                            editable={false}
                            fieldValue={cidade}
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

                    <ContainerImage>
                        <ProfileImage source={require("../../assets/photo.png")} />
                        <ViewTitle>
                            <TitleProfile>{role.name}</TitleProfile>
                            <SubTitleProfile>{role.email}</SubTitleProfile>
                        </ViewTitle>
                        <ButtonCamera />
                    </ContainerImage>

                    <ContainerSafeEdit>
                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            editable={true}
                            placeholder={dataTeste}
                            insertRecord={true}
                            onChangeText={setDataNascimento}
                        />
                        <BoxInput
                            textLabel={'CPF'}
                            editable={true}
                            insertRecord={true}
                            fieldValue={cpf}
                            onChangeText={setCpf}
                        />
                        <BoxInput
                            textLabel={'Logradouro'}
                            editable={true}
                            fieldValue={logradouro}
                            insertRecord={true}
                            onChangeText={setLogradouro}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                fieldWidth={'45'}
                                editable={true}
                                insertRecord={true}
                                fieldValue={cep}
                                onChangeText={setCep}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                fieldWidth={'45'}
                                insertRecord={true}
                                editable={true}
                                fieldValue={cidade}
                                onChangeText={setCidade}
                            />
                        </ViewFormat>

                        <Btn onPress={() => updatePatient()}>
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
