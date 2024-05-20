import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal, RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment, BtnModal } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useEffect, useState } from "react"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"
import { SelectList } from "react-native-dropdown-select-list"
import api from "../../services/service"


export const ModalSchedule = ({ navigation, visible, setShowModalSchedule, city, ...rest}) => {

  const [agendamento, setAgendamento] = useState(null);
  const [typeAppointment, setTypeAppointment] = useState(null)
  const [citySelected, setCitySelected] = useState(null)
  const [renderizar, setRenderizar] = useState(false);


  async function handleContinue() {

    if (agendamento == null || agendamento.prioridadeLabel == null || agendamento.localizacao == null) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    await setShowModalSchedule(false);

    navigation.replace('SelectClinic', { agendamento: agendamento })
  }

  async function onPressHandle() {
    await setShowModalSchedule(false)
    if (typeAppointment != null) {
      navigation.replace("SelectClinic");
    } else {
      console.warn("É necessário selecionar o nível da consulta");
    }

  }

     function dePara(retornoApi) {
      if (city != null) {
        let arrayOptions = [];
        retornoApi.forEach((e) => {
       arrayOptions.push({ value: e.endereco.cidade});
     });
 
     return arrayOptions;
    }
  }

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
      <ViewModal>
        <ContentModal>
          <TitleProfile>Agendar consulta</TitleProfile>

          <TypeAppointment>

            {/* SELECIONAR O TIPO DE CONSULTA */}
            {/* <LabelSchedule>Informe o tipo de consulta</LabelSchedule>
 
            <TypeButton onPress={() => setShowOptions(true)}>
              <BlueTitle>{selectedOption || 'Tipo de consulta'}</BlueTitle>
            </TypeButton> 

            {showOptions && (
              <OptionsContainer >
                {opcoes.map((option, index) => (
                  <Option key={index} onPress={() => onPressOption(option)} >
                    <TextOption> {index + 1}- {option}</TextOption>
                  </Option>
                ))}
              </OptionsContainer>
            )}*/}


            {/* SELECIONAR QUAL O NIVEL DA CONSULTA */}
            <LabelSchedule>Qual o nível da consulta</LabelSchedule>
            <RowContainerButton>


              <SmallButton onPress={() => setAgendamento({
                ...agendamento,
                prioridadeId: "395C5E28-07BE-467B-AE19-3DE0B37C6945",
                prioridadeLabel: "Rotina"
              })}
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Rotina' : false} >

                <BlueTitle>Rotina</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => setAgendamento({
                ...agendamento,
                prioridadeId: "95DA7213-24E5-42E8-BE31-EA5CDC6B19A0",
                prioridadeLabel: "Exames"
              })}
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Exames' : false}>
                <BlueTitle>Exames</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => setAgendamento({
                ...agendamento,
                prioridadeId: "395C5E28-07BE-467B-AE19-3DE0B37C6945",
                prioridadeLabel: "Urgencia"
              })}
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Urgencia' : false}>
                <BlueTitle>Urgencia</BlueTitle>
              </SmallButton>

            </RowContainerButton>

            {/* INFORMAR A LOCALIZACAO */}
            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>

            <SelectList
              boxStyles={{ width: "100%", height: 70, alignItems: "center", marginTop: 20 }}
              fontFamily="Quicksand_500Medium"
              searchPlaceholder="Pesquise"
              placeholder="Selecione uma cidade"
              maxHeight={100}
              dropdownTextStyles={{ fontSize: 18 }}
              inputStyles={{ fontSize: 18 }}
              setSelected={(txt) => setAgendamento({
                ...agendamento,
                localizacao: txt
              })}
              notFoundText='Nenhum dado encontrado'
              data={dePara(city)}
              save="endereco.cidade"
            />

            {/* <InputAppointment placeholder={"Informe a localizacao"}
              value={agendamento ? agendamento.localizacao : null}
              onChangeText={(txt) => setAgendamento({
                ...agendamento,
                localizacao: txt
              })} /> */}


          </TypeAppointment>
          <BtnModal onPress={() => { handleContinue() }}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </BtnModal>

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}
