import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal,  RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useState } from "react"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"


export const ModalSchedule = ({ navigation, visible, setShowModalSchedule , ...rest }) => {

  const [agendamento, setAgendamento] = useState(null);
  
  const nivelConsulta = [
    {id: "395C5E28-07BE-467B-AE19-3DE0B37C6945", tipo: "Rotina"},
    {id: "95DA7213-24E5-42E8-BE31-EA5CDC6B19A0", tipo: "Exame"},
    {id: "52785D0D-267F-468A-A671-0FD61A8E4A9E", tipo: "Urgencia"},
  ]

  async function handleContinue () {
    await setShowModalSchedule(false);

    navigation.replace('SelectClinic' , {agendamento : agendamento})
  }

  // const [showOptions, setShowOptions] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');

  // const opcoes = ['Pediatria', 'Clinico geral', 'Cardiologista'];

  // const onPressOption = (option) => {
  //   setSelectedOption(option);
  //   setShowOptions(false);
  // };s

  async function onPressHandle() {
    await setShowModalSchedule(false)
    if(typeAppointment != null){
      navigation.replace("SelectClinic");
    }else{
          console.warn("É necessário selecionar o nível da consulta");
    }
    
  }
  

  const[typeAppointment,setTypeAppointment] = useState(null)


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

            
              <SmallButton onPress={() => setAgendamento({...agendamento, 
                prioridadeId : "395C5E28-07BE-467B-AE19-3DE0B37C6945",
                prioridadeLabel : "Rotina"             
                })} 
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Rotina'  : false} >

                <BlueTitle>Rotina</BlueTitle>
                </SmallButton>

              <SmallButton onPress={() => setAgendamento({...agendamento, 
                prioridadeId : "95DA7213-24E5-42E8-BE31-EA5CDC6B19A0",
                prioridadeLabel : "Exames"             
                })} 
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Exames' : false}>
                <BlueTitle>Exames</BlueTitle>
                </SmallButton>

              <SmallButton onPress={() => setAgendamento({...agendamento, 
                prioridadeId : "395C5E28-07BE-467B-AE19-3DE0B37C6945",
                prioridadeLabel : "Urgencia"             
                })} 
                isSelected={agendamento ? agendamento.prioridadeLabel == 'Urgencia'  : false}>
                <BlueTitle>Urgencia</BlueTitle>
                </SmallButton>

            </RowContainerButton>

            {/* INFORMAR A LOCALIZACAO */}
            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>
            <InputAppointment placeholder={"Informe a localizacao"} 
            value={ agendamento ? agendamento.localizacao : null}
            onChangeText={(txt) => setAgendamento({
              ...agendamento,
              localizacao : txt
            })}/>
            

          </TypeAppointment>
          <Btn onPress={() => {handleContinue()}}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </Btn>  

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}
