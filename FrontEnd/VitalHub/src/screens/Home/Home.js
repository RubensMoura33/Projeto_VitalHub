import { useEffect, useState } from "react"
import { BtnAppointment } from "../../components/BtnAppointment/BtnAppointment"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { Container, FilterAppointment, } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { ListComponent } from "../../components/List/List"
import { Card } from "../../components/Card/Card"
import { ModalCancel } from "../../components/ModalCancel/ModalCancel"
import { ModalAppointment } from "../../components/ModalAppointment/ModalAppointment"
import { BtnCard, BtnSchedule } from "../../components/Button/Button"
import { FontAwesome } from '@expo/vector-icons';
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import { Text, TouchableOpacity } from "react-native"
import { ModalSeeDoctor } from "../../components/ModalSeeDoctor/ModalSeeDoctor"
import { userDecodeToken } from "../../Utils/Auth"
import api, { buscarConsultasMedico, buscarConsultasPaciente } from "../../services/service"
import moment, { duration } from 'moment';






export const Home = ({ navigation }) => {
   
    const [dataConsulta, setDataConsulta] = useState('');
    const [statusList, setStatusList] = useState("agendada")
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)
    const [userData, setUserData] = useState({});
    const [paciente, setPaciente] = useState()
    const [medicoData, setMedicoData] = useState({});
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);

    async function loadData() {
        const token = await userDecodeToken();

        setUserData(token);
        setDataConsulta(moment().format('YYYY-MM-DD'))


    }
    async function ListarConsultas() {


        if (userData.role == "Medico") {
            const response = await api.get(`${buscarConsultasMedico}?data=${dataConsulta}&id=${userData.id}`);
      
            setMedicoData(response.data);
            
        
            
        } else {

            const response = await api.get(`${buscarConsultasPaciente}?data=${dataConsulta}&id=${userData.id}`)

            setPaciente(response.data);
            
    

        }
    }

   async function MostrarModal(tipoConsulta, consulta) {
        if (tipoConsulta == 'cancelar') {
           setConsultaSelecionada(consulta)
            setShowModalCancel(true)

        }
    }

    function MostrarModalProntuario(tipoConsulta, consulta) {
        if (tipoConsulta == 'cancelar') {
            setConsultaSelecionada(consulta)
            setShowModalSeeDoctor(true)

        }
    }
  async  function MostrarModalInserir(tipoConsulta , consulta)
    {
        if(tipoConsulta == 'cancelar')
        {

         setConsultaSelecionada(consulta)
         setShowModalAppointment(true)

        }
    }


    useEffect(() => {
        loadData();
        
    }, [])
    
    useEffect(() => {
        if (dataConsulta != '') {
            ListarConsultas()
        }
    }, [dataConsulta])

    useEffect(() => {
ListarConsultas();
    },[showModalCancel])

    

    return (
        userData.role == "Medico" ?
            <Container>
                <Header nome={`Dr(a). ${userData.name}`} ProfileImage={{uri: userData.foto}} onPress={() => navigation.replace("Profile")} />

                <CalendarHome
                    setDataConsulta={setDataConsulta}
                />


                <FilterAppointment>

                    <BtnAppointment
                        textButton={'Agendadas'}
                        clickButton={statusList === 'agendada'}
                        onPress={() => setStatusList('agendada')}
                    />

                    <BtnAppointment
                        textButton={'Realizadas'}
                        clickButton={statusList === 'realizada'}
                        onPress={() => setStatusList('realizada')}
                    />

                    <BtnAppointment
                        textButton={'Canceladas'}
                        clickButton={statusList === 'cancelada'}
                        onPress={() => setStatusList('cancelada')} />


                </FilterAppointment>


                {/* Lista (FlatList)*/}
                <ListComponent
                    data={medicoData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.situacao.situacao == 'Pendentes') {
                            return (
                     
                                    <Card 
                                        id={item.id}
                                        foto={item.paciente.idNavigation.foto}
                                        name={item.paciente.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        tipoUser={userData.role}
                                        age={item.paciente.idade}
                                        hour={item.dataConsulta}
                                        typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}
                                        onPressCancel={() => MostrarModal('cancelar', item)}
                                    />
                          
                            )
                        } else if (statusList === 'realizada' && item.situacao.situacao == 'Realizados') {
                            return (

                   

                                    <Card 
                                    id={item.id}
                                    name={item.paciente.idNavigation.nome}
                                    foto={item.paciente.idNavigation.foto}
                                    status={item.situacao.situacao}
                                    tipoUser={userData.role}
                                    age={item.paciente.idade}
                                    hour={item.dataConsulta}
                                    typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}
                                    onPressAppointment={() => {
                                        navigation.replace('MedicalRecord', {data: item})
                                    }}
                                />


                            )
                        } else if (statusList === 'cancelada'&& item.situacao.situacao == 'Cancelados') {
                            return (
                                <Card 
                                id={item.id}
                                name={item.paciente.idNavigation.nome}
                                foto={item.paciente.idNavigation.foto}
                                status={item.situacao.situacao}
                                tipoUser={userData.role}
                                age={item.paciente.idade}
                                hour={item.dataConsulta}
                                typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}
                          
                            />
                            )
                        }
                    }


                    }
                />

                <ModalCancel
                    visible={showModalCancel}
                    setShowModalCancel={setShowModalCancel}
                    data={consultaSelecionada}
                />

                <ModalAppointment
                    visible={showModalAppointment}
                    setShowModalAppointment={setShowModalAppointment}
                    navigation={navigation}
                   data={consultaSelecionada}

                />


            </Container>
            :
            <Container>
                <Header nome={userData.name} ProfileImage={{uri: userData.foto}} onPress={() => navigation.replace("Profile")} />
                <CalendarHome
                    setDataConsulta={setDataConsulta}
                />

                <FilterAppointment>
                    <BtnAppointment
                        textButton={'Agendadas'}
                        clickButton={statusList === 'agendada'}
                        onPress={() => setStatusList('agendada')}
                    />

                    <BtnAppointment
                        textButton={'Realizadas'}
                        clickButton={statusList === 'realizada'}
                        onPress={() => setStatusList('realizada')}
                    />

                    <BtnAppointment
                        textButton={'Canceladas'}
                        clickButton={statusList === 'cancelada'}
                        onPress={() => setStatusList('cancelada')}
                    />
                </FilterAppointment>

                <ListComponent
                    data={paciente}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.situacao.situacao == 'Pendentes') {
                            return (
                                <TouchableOpacity onPress={async () => {
                                    MostrarModalProntuario('cancelar', item)

                                }}>
                                    <Card
                                    id={item.id}
                                        name={item.medicoClinica.medico.idNavigation.nome}
                                        foto={item.medicoClinica.medico.idNavigation.foto}
                                        crm={item.medicoClinica.medico.crm}
                                        tipoUser={userData.role}
                                        status={item.situacao.situacao}
                                        hour={item.dataConsulta}
                                        typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}
                                        onPressCancel={() => MostrarModal('cancelar', item)}
                                    />
                                </TouchableOpacity>
                            )
                        } else if (statusList === 'realizada' && item.situacao.situacao == 'Realizados') {
                            return (
                                <Card
                                    id={item.id}
                                    name={item.medicoClinica.medico.idNavigation.nome}
                                    foto={item.medicoClinica.medico.idNavigation.foto}
                                    tipoUser={userData.role}
                                    crm={item.medicoClinica.medico.crm}
                                    status={item.situacao.situacao}
                                    hour={item.dataConsulta}
                                    typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}
                                    onPressAppointment={() => {
                                        navigation.replace('SeePrescription', {data: item})
                                    }}
                                />
                            )
                        } else if (statusList === 'cancelada' && item.situacao.situacao == 'Cancelados') {
                            return (
                                <Card
                                id={item.id}
                                    name={item.medicoClinica.medico.idNavigation.nome}
                                    foto={item.medicoClinica.medico.idNavigation.foto}
                                    tipoUser={userData.role}
                                    crm={item.medicoClinica.medico.crm}
                                    status={item.situacao.situacao}
                                    hour={new Date(item.dataConsulta).toLocaleDateString('pt-BR')}
                                    typeAppointment={item.prioridade.prioridade == 0 ? 'Rotina' : item.prioridade.prioridade == 1 ? 'Exames' : 'Urgencia'}

                                />
                            )
                        }
                    }}
                />


                <ModalCancel
                    visible={showModalCancel}
                    data={consultaSelecionada}
                    setShowModalCancel={setShowModalCancel}
                />

      

                <BtnSchedule onPress={() => setShowModalSchedule(true)}>
                    <FontAwesome name="stethoscope" size={40} color="white" />
                </BtnSchedule>

                <ModalSchedule
                    visible={showModalSchedule}
                    navigation={navigation}
                    setShowModalSchedule={setShowModalSchedule}
                />

                <ModalSeeDoctor
                    visible={showModalSeeDoctor}
                    roleUsuario={userData.role}
                    data={consultaSelecionada}
                    setShowModalSeeDoctor={setShowModalSeeDoctor}
                    navigation={navigation}

                />



            </Container>

    )
}