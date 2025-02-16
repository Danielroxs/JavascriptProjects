// Selectores
const pacienteInput = document.querySelector('#paciente')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')

// Eventos
pacienteInput.addEventListener('change', datosCita)
propietarioInput.addEventListener('change', datosCita)
telefonoInput.addEventListener('change', datosCita)
fechaInput.addEventListener('change', datosCita)
horaInput.addEventListener('change', datosCita)
sintomasInput.addEventListener('change', datosCita)

formulario.addEventListener('submit', submitCita)

// Objeto de cita
const citaObj = {
    paciente: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}


// Funciones
function datosCita(e) {
    citaObj[e.target.name] = e.target.value.trim()
}

function submitCita(e) {
    e.preventDefault()

    if (Object.values(citaObj).some(valor => valor.trim() === '')) { // si en los valores osea el value de las propiedades del objeto "citaObj" incluyen ""...
        new Notificacion({ texto: 'Todos los campos son obligatorios', tipo: 'error' })
        return
    }
}

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