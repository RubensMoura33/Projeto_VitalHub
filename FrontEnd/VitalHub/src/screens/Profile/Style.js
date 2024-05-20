import { View } from "react-native";
import styled from "styled-components";

export const ContainerImage = styled.View`
position: relative;
`


export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity : 0.8

}
)`
padding: 12px;
border-radius: 10px;
background-color: #496bba;

border: 1px solid #fbfbfb;
bottom: -20px;
right: 15px;
position: absolute;
`