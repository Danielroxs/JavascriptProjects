// Selectores
const pacienteInput = document.querySelector('#paciente')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')
const botonFormulario = document.querySelector('#boton-formulario')
const contenedorCitas = document.querySelector('#citas')



// Eventos
pacienteInput.addEventListener('change', datosCita)
propietarioInput.addEventListener('change', datosCita)
telefonoInput.addEventListener('change', datosCita)
fechaInput.addEventListener('change', datosCita)
horaInput.addEventListener('change', datosCita)
sintomasInput.addEventListener('change', datosCita)

formulario.addEventListener('submit', submitCita)

let editando = false;

// Objeto de cita
const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Clases
class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar()
    }

    mostrar() {
        // Crear la notificacion
        const alerta = document.createElement('DIV')
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-2', 'alert', 'uppercase', 'font-bold', 'text-sm')

        // Eliminar alertas duplicadas
        const alertaprevia = document.querySelector('.alert')
        alertaprevia?.remove()


        // Si es de tipo error, agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')

        // Mensaje de error
        alerta.textContent = this.texto

        // Insertar en el DOM 
        formulario.parentElement.insertBefore(alerta, formulario)

        // Quitar despues de 5 segundos
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }

}

class AdminCitas {
    constructor() {
        this.citas = [];
    }

    agregar(cita) {
        this.citas = [...this.citas, cita]
        this.mostrar()
    }

    editar(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        this.mostrar()
    }

    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
        this.mostrar()
    }

    mostrar() {
        // Limpiar el HTML previo
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        // Si hay citas
        if (this.citas.length === 0) {
            contenedorCitas.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No hay pacientes</p>`
            return
        }

        // Generando las citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'max-w-md', 'mx-auto', 'mt-4', 'space-y-3', 'border', 'border-gray-200');

            const paciente = document.createElement('p');
            paciente.classList.add('font-medium', 'text-gray-800', 'text-sm');
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-medium', 'text-gray-800', 'text-sm');
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const telefono = document.createElement('p');
            telefono.classList.add('font-medium', 'text-gray-800', 'text-sm');
            telefono.innerHTML = `<span class="font-bold uppercase">Teléfono: </span> ${cita.telefono}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-medium', 'text-gray-800', 'text-sm');
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const hora = document.createElement('p');
            hora.classList.add('font-medium', 'text-gray-800', 'text-sm');
            hora.innerHTML = `<span class="font-bold uppercase">Hora: </span> ${cita.hora}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-medium', 'text-gray-800', 'text-sm');
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            // Contenedor de botones
            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex', 'justify-end', 'gap-2', 'mt-3');

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'text-xs', 'font-semibold', 'uppercase', 'rounded-md', 'p-1', 'px-3', 'btn-editar');
            btnEditar.innerHTML = 'Editar';
            const clone = structuredClone(cita)
            btnEditar.onclick = () => {
                cargarEdicion(cita) // Llamamos a la función para cargar los datos al formulario
            }

            // Botón Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'text-xs', 'font-semibold', 'uppercase', 'rounded-md', 'p-1', 'px-3');
            btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.onclick = () => this.eliminar(cita.id)

            // Agregar botones al contenedor
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar elementos al divCita
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(telefono);
            divCita.appendChild(fecha);
            divCita.appendChild(hora);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);

            // Agregar la cita al contenedor principal
            contenedorCitas.appendChild(divCita);
        });
    }

}

// Funciones
function datosCita(e) {
    citaObj[e.target.name] = e.target.value.trim()
}

const citas = new AdminCitas()

function submitCita(e) {
    e.preventDefault()

    // Validar el formulario antes de continuar
    if (!validarFormulario()) return

    if (Object.values(citaObj).some(valor => valor.trim() === '')) { // si en los valores osea el value de las propiedades del objeto "citaObj" incluyen ""...
        new Notificacion({ texto: 'Todos los campos son obligatorios', tipo: 'error' })
        return
    }

    if (editando) {
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
    editando = false;

}

function reiniciarObjeto() {
    Object.keys(citaObj).forEach(key => citaObj[key] = '');
    citaObj.id = generarId()
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now()
}

function cargarEdicion(cita) {
    Object.assign(citaObj, cita)

    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    telefonoInput.value = cita.telefono
    fechaInput.value = cita.fecha
    horaInput.value = cita.hora
    sintomasInput.value = cita.sintomas

    editando = true

    botonFormulario.textContent = 'Guardar cambios'
}

function validarFormulario() {
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

