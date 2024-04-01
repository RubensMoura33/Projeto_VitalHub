import axios from "axios";


export const loginResource = "Login";

export const especialidadeResource = "Especialidade"

export const buscarPacienteResource = "Pacientes/BuscarPorID"

export const medicosResource = "Medicos"

export const clinicasResource = "Clinica/ListarTodas"

export const medicosClinicaResource = "Medicos/BuscarPorIDClinica"

const porta = "4466"
const ip = "172.16.39.103";

const localApiUri = `http://${ip}:${porta}/api/`

const api = axios.create({
    baseURL: localApiUri
})


export default api;