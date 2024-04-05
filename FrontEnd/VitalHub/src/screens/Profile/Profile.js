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
import api, { especialidadeResource, buscarPacienteResource, medicosResource, GetSpecialtiesResource, buscarMedicoResource, PostUser } from "../../services/service"

export const Profile = ({ navigation }) => {

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
    const [dataNascimento, setDataNascimento] = useState();
    const [numero, setNumero] = useState()
    const [cidade, setCidade] = useState()
    const [nome, setNome] = useState();

   
    //Configuracao token

    const [role, setRole] = useState({});

    async function logOut() {
        AsyncStorage.removeItem("token");
        navigation.replace("Login")
    } 
    const config = {
        headers: { Authorization: `Bearer ${role}` }
    };

    async function loadData() {
        const token = await userDecodeToken();
        setRole(token);

        var response = null

        if (token.role == "Medico") {
            response = await api.get(`${buscarMedicoResource}?id=${token.id}`)
            setEspecialidade(response.data.especialidade.especialidade1)
            setLogradouro(response.data.endereco.logradouro)
            setCep(response.data.endereco.cep)
        } else {
            try {
                response = await api.get(`${buscarPacienteResource}?id=${token.id}`)
                setDataNascimento(response.data.dataNascimento)
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
            var promise = await api.put(PostUser, {

                rg: rg,
                cpf: cpf,
                dataNascimento: dataNascimento,
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                cidade: cidade,
                nome: nome,
                email: dataUser.idNavigation.email,
                idTipoUsuario: "5f6bd789-1bea-4199-8ada-3cce3035272e",
                
            }, config)
            console.log(dataUser.idNavigation.email);
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


    useEffect(() => {
        loadData();
        GetSpecialties();
        console.log(dataUser);
        dePara(especialidades)
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
                            fieldValue={dataUser.crm}
                        />

                        <BoxInput
                            textLabel={'Especialidade'}
                            placeholder={'Insira uma especialidade'}
                            fieldValue={especialidade}
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
                            data={dePara(especialidades)}
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
                    <ProfileImage source={require("../../assets/photo.png")} />


                    <ViewTitle>
                        <TitleProfile>{role.name}</TitleProfile>
                        <SubTitleProfile>{role.email}</SubTitleProfile>
                    </ViewTitle>

                    <ContainerSafeEdit>
                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            editable={true}
                            fieldValue={new Date(dataNascimento).toLocaleDateString("pt-BR")}
                            onChangeText={setDataNascimento}
                        />
                        <BoxInput
                            textLabel={'CPF'}
                            editable={true}
                            fieldValue={cpf}
                            onChangeText={setCep}
                        />
                        <BoxInput
                            textLabel={'Logradouro'}
                            editable={true}
                            fieldValue={logradouro}
                            onChangeText={setLogradouro}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                fieldWidth={'45'}
                                editable={true}
                                fieldValue={cep}
                                onChangeText={setCep}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                fieldWidth={'45'}
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
