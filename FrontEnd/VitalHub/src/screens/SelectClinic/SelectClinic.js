
import { Container } from "../../components/Container/Style"
import { BtnSelect, Cancel, Title } from "./Style"
import { Btn } from "../../components/Button/Button"
import { ButtonTitle } from "../../components/Title/Style"
import { ListComponent } from "../../components/List/List"
import { CardClinic } from "../../components/CardClinic/CardClinic"
import { useEffect, useState } from "react"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api, { clinicasResource } from "../../services/service"


const Clinicas = [
    { id: 1, nome: "Clínica Natureh", Localizacao: "São Paulo, SP", Avaliacao: "4,5", Abertura: "Seg-Sex" },
    { id: 2, nome: "Diamond Pró-Mulher", Localizacao: "São Paulo, SP", Avaliacao: "4,8", Abertura: "Seg-Sex" },
    { id: 3, nome: "Clinica Villa Lobos", Localizacao: "Taboão, SP", Avaliacao: "4,2", Abertura: "Seg-Sab" },
    { id: 4, nome: "SP Oncologia Clínica", Localizacao: "Taboão, SP", Avaliacao: "4,2", Abertura: "Seg-Sab" },
]

export const SelectClinic = ({ navigation }) => {

    const [selectedClinic, setSelectedClinic] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [clinicas, setClinicas] = useState([])

   useEffect(() => {
        loadClinic()
        console.log(selectedClinic);
   }, [selectedClinic])

      async function loadClinic() 
      {
        try {
            response = await api.get(`${clinicasResource}`)
            setClinicas(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error + " erro senai");
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
                    <BtnSelect onPress={() => setSelectedClinic(item.id)}>
                        <CardClinic name={item.nomeFantasia}
                            loc={item.endereco.logradouro}
                            aval={"4.5"}
                            date={"Seg-Sex"}
                            isSelected={item.id == selectedClinic}

                        />
                    </BtnSelect>
                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => { navigation.replace("SelectDoctor" , {idClinica: selectedClinic}) }}>
                <ButtonTitle >CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>


    )
}