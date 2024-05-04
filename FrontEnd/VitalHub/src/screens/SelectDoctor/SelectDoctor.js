import { useEffect, useState } from "react"
import { Btn } from "../../components/Button/Button"
import { CardDoctor } from "../../components/CardDoctor/CardDoctor"
import { Container } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { ButtonTitle } from "../../components/Title/Style"
import { BtnSelect, Cancel, Title } from "../SelectClinic/Style"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api, { medicosClinicaResource, medicosResource } from '../../services/service'


export const SelectDoctor = ({ navigation, route }) => {

    const { idClinica } = route.params || null
    const [medicoLista, setMedicoLista] = useState([]); 
     const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)

    function handleContinue() {
if(selectedDoctor == null){
    console.warn("É necessário selecionar um médico");
    return;
}
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
    }''

    useEffect(() => {
        listarMedicos();
    }, [])
  

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
                            medicoLabel : item.idNavigation.nome,
                            especialidade : item.especialidade.especialidade1
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