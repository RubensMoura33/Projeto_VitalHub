
import { Container } from "../../components/Container/Style"
import { BtnSelect, Cancel, Title } from "./Style"
import { Btn } from "../../components/Button/Button"
import { ButtonTitle } from "../../components/Title/Style"
import { ListComponent } from "../../components/List/List"
import { CardClinic } from "../../components/CardClinic/CardClinic"
import { useEffect, useState } from "react"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api, { clinicasResource } from "../../services/service"




export const SelectClinic = ({ navigation, route }) => {

    const [selectedClinic, setSelectedClinic] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [clinicas, setClinicas] = useState([])
    const [clinica, setClinica] = useState([])

    useEffect(() => {
        loadClinic()
    }, [])

    function handleContinue() {


        if(selectedClinic == null){
            console.warn("É necessário selecionar uma clinica");
            return;
        }
        navigation.replace("SelectDoctor" , {
            agendamento:{
            ...route.params.agendamento,
            ...selectedClinic
        }
        })
    }
    function passandoInfo ()
    {

    }
    async function loadClinic() {
        try {
            response = await api.get(`Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            setClinicas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onPressHandle = () => {
        setShowModalSchedule(true)
        navigation.navigate("Main");

    }
    return (
        <Container>
            <Title>Selecionar clinica</Title>

            {<ListComponent
                data={clinicas}
                renderItem={({ item }) =>
                (
                    <BtnSelect onPress={() => setSelectedClinic({
                        clinicaId : item.id,
                        clinicaLabel: item.nomeFantasia
                    })}>
                        <CardClinic name={item.nomeFantasia}
                            loc={item.endereco.logradouro}
                            aval={"4.5"}
                            date={"Seg-Sex"}
                            isSelected={selectedClinic ? item.id == selectedClinic.clinicaId : false }

                        />
                    </BtnSelect>
                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => { handleContinue() }}>
                <ButtonTitle >CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>


    )
}