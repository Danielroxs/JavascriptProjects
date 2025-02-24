import { formulario, botonFormulario, pacienteInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from "./selectores.js"
import { citaObj, editando } from './variables.js'
import Notificacion from "./classes/Notificacion.js"
import AdminCitas from "./classes/AdminCitas.js"

const citas = new AdminCitas()

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value.trim()
}

export function submitCita(e) {
    e.preventDefault()

    // Validar el formulario antes de continuar
    if (!validarFormulario()) return

    if (Object.values(citaObj).some(valor => valor.trim() === '')) { // si en los valores osea el value de las propiedades del objeto "citaObj" incluyen ""...
        new Notificacion({ texto: 'Todos los campos son obligatorios', tipo: 'error' })
        return
    }

    if (editando.value) {
        citas.editar({ ...citaObj })
        new Notificacion({ texto: 'Paciente actualizado', tipo: 'success' })
    } else {
        citas.agregar({ ...citaObj })
        new Notificacion({ texto: 'Paciente registrado', tipo: 'success' })
    }

    // Crear copia del objeto citaObjpara evitar referencias compartidas
    formulario.reset()

    // 🔹 Reiniciar citaObj para que esté vacío después de agregar una cita
    reiniciarObjeto()

    botonFormulario.textContent = 'Crear Cita'
    editando.value = false;

}


export function reiniciarObjeto() {
    Object.keys(citaObj).forEach(key => citaObj[key] = '');
    citaObj.id = generarId()
}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now()
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita)

    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    telefonoInput.value = cita.telefono
    fechaInput.value = cita.fecha
    horaInput.value = cita.hora
    sintomasInput.value = cita.sintomas

    editando.value = true

    botonFormulario.textContent = 'Guardar cambios'
}

export function validarFormulario() {
    // Expresiones regulares
    const regexTexto = /^[a-zA-Z\s]+$/;
    const regexTelefono = /^[0-9]{10,15}$/; // Teléfonos de 10 a 15 dígitos

    if (!regexTexto.test(pacienteInput.value)) {
        new Notificacion({ texto: 'Nombre del paciente no válido', tipo: 'error' });
        return false;
    }

    if (!regexTexto.test(propietarioInput.value)) {
        new Notificacion({ texto: 'Nombre del propietario no válido', tipo: 'error' });
        return false;
    }

    if (!regexTelefono.test(telefonoInput.value)) {
        new Notificacion({ texto: 'Teléfono inválido (Debe contener entre 10 y 15 números)', tipo: 'error' });
        return false;
    }

    if (!fechaInput.value || new Date(fechaInput.value) < new Date()) {
        new Notificacion({ texto: 'Fecha inválida (Debe ser hoy o en el futuro)', tipo: 'error' });
        return false;
    }

    if (!horaInput.value) {
        new Notificacion({ texto: 'Debe seleccionar una hora válida', tipo: 'error' });
        return false;
    }

    if (sintomasInput.value.trim() === '') {
        new Notificacion({ texto: 'Debe ingresar síntomas', tipo: 'error' });
        return false;
    }

    return true; // Si todo es correcto, retorna `true`
}

