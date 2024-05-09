import axios from "axios";


export const loginResource = "Login";

export const especialidadeResource = "Especialidade"

export const buscarPacienteResource = "Pacientes/BuscarPorID"

export const buscarConsultasPaciente = "Pacientes/BuscarPorData"

export const buscarConsultasMedico = "Medicos/BuscarPorData"

export const buscarMedicoResource = 'Medicos/BuscarPorId'

export const medicosResource = "Medicos"

export const clinicasResource = "Clinica/ListarTodas"

export const medicosClinicaResource = "Medicos/BuscarPorIDClinica"

export const buscarClinicId = "Clinica/BuscarPorId"

export const GetSpecialtiesResource = "Especialidade"

export const PostUser = "Pacientes"

export const GetIdTipoUsuario = "TiposUsuario"

export const PutStatusTipoUsuario = "Consultas/Status"

export const InseririrProntuario = "Consultas/Prontuario"

export const RecuperarSenha = "RecuperaraSenha?email="


const porta = "4466"
const ip = "192.168.21.116";

const localApiUri = `http://${ip}:${porta}/api/`

const api = axios.create({
    baseURL: localApiUri
})


export default api;

