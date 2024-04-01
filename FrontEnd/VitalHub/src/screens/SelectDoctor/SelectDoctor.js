import { useEffect, useState } from "react"
import { Btn } from "../../components/Button/Button"
import { CardDoctor } from "../../components/CardDoctor/CardDoctor"
import { Container } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { ButtonTitle } from "../../components/Title/Style"
import { BtnSelect, Cancel, Title } from "../SelectClinic/Style"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api, { medicosResource } from '../../services/service'


const Medicos = [
    { id: 1, nome: "Dra Alessandra", Especialidade: "Demartologa, Esteticista", Foto: require("../../assets/nicole.png") },
    { id: 2, nome: "Dr Kumushiro", Especialidade: "Cirurgião, Cardiologista", Foto: require("../../assets/medico.png") },
    { id: 3, nome: "Dr Rodrigo Santos", Especialidade: "Clínico, Pediatra", Foto: require("../../assets/photo.png") },
    { id: 4, nome: "Dr Gabriel Gab", Especialidade: "Oftamologista", Foto: require("../../assets/gab.jpg") },

]



export const SelectDoctor = ({ navigation }) => {

    const [medicoLista, setMedicoLista] = useState([]);

    async function listarMedicos() {
        try {
            const response = await api.get(medicosResource);
         
            setMedicoLista(response.data);

            
        } catch (error) {
           console.log(error); 
        }
    }


    useEffect(() => {
        listarMedicos();
        console.log(medicoLista);
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
         
                    <BtnSelect onPress={() => setSelectedDoctor(item.id)}>
                        <CardDoctor name={item.idNavigation.nome}
                            espec={item.especialidade.especialidade1}                       
                            isSelected={item.id == selectedDoctor}
                        />
                    </BtnSelect>
                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => navigation.replace("SelectDate")}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>
    )
}