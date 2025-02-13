// Variables y selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

// Eventos
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)

    formulario.addEventListener('submit', agregarGasto)
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
        console.log(this.restante)
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id)
        console.log(this.gastos)
        this.calcularRestante()
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo los valores
        const { presupuesto, restante } = cantidad

        // Agregandolos al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert')

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario)

        // Quitar alerta del HTML
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }

    mostrarGastos(gastos) {

        this.limpiarHTML() // Elimina el HTML previo

        // Iterar sobre los gastos
        gastos.forEach(gasto => {

            const { cantidad, nombre, id } = gasto

            // Crear Li
            const nuevoGasto = document.createElement('li')
            nuevoGasto.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            nuevoGasto.dataset.id = id

            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`

            // Boton para borrar el gasto
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.innerHTML = 'Borrar &times'
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar)

            // Agregar al HTML
            gastoListado.appendChild(nuevoGasto)


        })
    }

    limpiarHTML() {
        // Limpiar el HTML
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante'); // ✅ Definimos la variable solo una vez

        // Comprobar el 25% del presupuesto
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }
        // Comprobar el 50% del presupuesto
        else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        }
        // Si el presupuesto aún está por encima del 50%, restaurar a verde
        else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        // Si el presupuesto llega a 0 o menos, bloquear el formulario
        if (restante < 0) {
            ui.imprimirAlerta('El presupuesto se ha terminado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        } else {
            formulario.querySelector('button[type="submit"]').disabled = false; // ✅ Habilitar nuevamente el botón si el presupuesto vuelve a estar positivo
        }
    }
}

// Instanciar
const ui = new UI()
let presupuesto;

// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto?')

    // console.log(presupuestoUsuario)

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload()
    }

    presupuesto = new Presupuesto(presupuestoUsuario)
    console.log(presupuesto)

    ui.insertarPresupuesto(presupuesto)
}

// Agrega gastos
function agregarGasto(e) {
    e.preventDefault()

    // Seleccionar inputs y leer informacion del formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    // Validar campos
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')

        return
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Introduzca una cantidad valida', 'error')

        return
    }

    // Generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    // Agrega un nuevo gasto
    presupuesto.nuevoGasto(gasto)

    // Mensaje de exito!
    ui.imprimirAlerta('Gasto agregado')

    // Imprimir los gastos
    const { gastos, restante } = presupuesto
    ui.mostrarGastos(gastos)

    // Actualizar restante
    ui.actualizarRestante(restante)

    // Comprobar presupuesto
    ui.comprobarPresupuesto(presupuesto)

    // Reinicia el formulario
    formulario.reset()
}

function eliminarGasto(id) {
    // Elimina los gastos del objeto
    presupuesto.eliminarGasto(id)

    // Elimina los gastos del HTML
    const { gastos, restante } = presupuesto
    ui.mostrarGastos(gastos)

    // Actualizar restante
    ui.actualizarRestante(restante)

    // Comprobar presupuesto
    ui.comprobarPresupuesto(presupuesto)
}