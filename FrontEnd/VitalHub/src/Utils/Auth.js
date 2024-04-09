import AsyncStorage from "@react-native-async-storage/async-storage";

import { jwtDecode } from "jwt-decode";

import { decode, encode } from "base-64";

if(!global.atob)
{
    global.atob = decode
}
if(!global.btoa)
{
    global.btoa = encode
}

//Funcao de decodificar o token
export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token')).token;

    if(token === null)
    {
        return null;

    }

    //descriptrografando o token
    const decoded = jwtDecode(token);

    return{
        token: token,
        role: decoded.role,
        name: decoded.name,
        email: decoded.email,
        id: decoded.jti
    }
}