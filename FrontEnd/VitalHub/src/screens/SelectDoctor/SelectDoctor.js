import { useEffect, useState } from "react"
import { Btn } from "../../components/Button/Button"
import { CardDoctor } from "../../components/CardDoctor/CardDoctor"
import { Container } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { ButtonTitle } from "../../components/Title/Style"
import { BtnSelect, Cancel, Title } from "../SelectClinic/Style"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api, { medicosClinicaResource, medicosResource } from '../../services/service'


const Medicos = [
    { id: 1, nome: "Dra Alessandra", Especialidade: "Demartologa, Esteticista", Foto: require("../../assets/nicole.png") },
    { id: 2, nome: "Dr Kumushiro", Especialidade: "Cirurgião, Cardiologista", Foto: require("../../assets/medico.png") },
    { id: 3, nome: "Dr Rodrigo Santos", Especialidade: "Clínico, Pediatra", Foto: require("../../assets/photo.png") },
    { id: 4, nome: "Dr Gabriel Gab", Especialidade: "Oftamologista", Foto: require("../../assets/gab.jpg") },

]



export const SelectDoctor = ({ navigation, route }) => {

    const { idClinica } = route.params || null
    const [medicoLista, setMedicoLista] = useState([]);

    function handleContinue() {
        navigation.replace("SelectDate", {
            agendamento : {
                ...route.params.agendamento,
                ...selectedDoctor
            }
        })
    }

    async function listarMedicos() {
        try {
            const response = await api.get(`${medicosClinicaResource}?id=${route.params.agendamento.clinicaId}`);
            setMedicoLista(response.data);


        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        listarMedicos();
    }, [])
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)

    const onPressHandle = () => {
        setShowModalSchedule(true)
        navigation.navigate("Main");

    }


    return (
        <Container>
            <Title>Selecionar Medico</Title>

            {<ListComponent
                data={medicoLista}
                renderItem={({ item }) =>
                (

                    <BtnSelect onPress={() => setSelectedDoctor(
                        {
                            medicoClinicaId : item.id,
                            medicoLabel : item.idNavigation.nome
                        }
                    )}>
                        <CardDoctor 
                            name={item.idNavigation.nome}
                            photo={item.idNavigation.foto}
                            espec={item.especialidade.especialidade1}
                            isSelected={selectedDoctor ? item.id == selectedDoctor.medicoClinicaId : false}
                        />
                    </BtnSelect>
                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => handleContinue()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>
    )
}