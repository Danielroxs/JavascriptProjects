import { pacienteInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario, botonFormulario, contenedorCitas } from './selectores.js'
import { datosCita, submitCita } from "./funciones.js"

// Eventos
pacienteInput.addEventListener('change', datosCita)
propietarioInput.addEventListener('change', datosCita)
telefonoInput.addEventListener('change', datosCita)
fechaInput.addEventListener('change', datosCita)
horaInput.addEventListener('change', datosCita)
sintomasInput.addEventListener('change', datosCita)
formulario.addEventListener('submit', submitCita)