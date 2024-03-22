import axios from "axios";


export const loginResource = "Login";

const porta = "4466"
const ip = "172.16.39.120";

const localApiUri = `http://${ip}:${porta}/api/`

const api = axios.create({
    baseURL: localApiUri
})


export default api;