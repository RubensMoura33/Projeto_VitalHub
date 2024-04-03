import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"

import {MaterialIcons} from "@expo/vector-icons"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react";
export const Header = ({nome, ProfileImage, onPress}) => {
const [user, setUser] = useState({});
  async function profileLoad(){
    const token = await userDecodeToken();

    console.log(token);
    setUser(token)
  }

  useEffect(() => {
profileLoad();
  }, [])
    return (
        <ContainerHeader>
        <BoxUser onPress={onPress}>
          <ImageUser source={ProfileImage} />
          <DataUser>
            <TextDefault>Bem vindo !</TextDefault>
            <NameUser>{user.name}</NameUser>
          </DataUser>
        </BoxUser>

        {/* material icons */}
        <MaterialIcons name="notifications" size={25} color="#fbfbfb" />
    
    </ContainerHeader>
    )
}