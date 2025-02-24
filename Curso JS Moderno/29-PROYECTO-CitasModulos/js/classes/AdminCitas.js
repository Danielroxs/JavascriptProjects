import { contenedorCitas } from "../selectores.js";
import { cargarEdicion } from "../funciones.js";

export default class AdminCitas {
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