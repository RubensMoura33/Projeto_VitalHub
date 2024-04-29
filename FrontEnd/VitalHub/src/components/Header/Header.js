import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"

import {MaterialIcons} from "@expo/vector-icons"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react";
export const Header = ({nome, ProfileImage, onPress}) => {

    return (
        <ContainerHeader>
        <BoxUser onPress={onPress}>
          <ImageUser source={ProfileImage} />
          <DataUser>
            <TextDefault>Bem vindo !</TextDefault>
            <NameUser>{nome}</NameUser>
          </DataUser>
        </BoxUser>

        {/* material icons */}
        <MaterialIcons name="notifications" size={25} color="#fbfbfb" />
    
    </ContainerHeader>
    )
}