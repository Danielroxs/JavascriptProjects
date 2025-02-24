import { formulario } from "../selectores.js";

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

export default Notificacion