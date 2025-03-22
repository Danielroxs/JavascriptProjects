const criptomonedasSelect = document.querySelector('#criptomonedas')
const monedaSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// Crear un Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})

async function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        const criptomonedas = await obtenerCriptomonedas(resultado.Data)
        selectCriptomonedas(criptomonedas)
    } catch (error) {
        console.log(error)
    }
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo

        const option = document.createElement('OPTION')
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value
}

function submitFormulario(e) {
    e.preventDefault()

    // Validar Formulario
    const { moneda, criptomoneda } = objBusqueda
    if (moneda === '' || criptomoneda === "") {
        mostrarAlerta('Ambos campos son obligatorios')
        return
    }

    // Consultar la API con los resultados
    consultarAPI()

}

function mostrarAlerta(msg) {
    const existeError = document.querySelector('.error')

    if (!existeError) {
        const divMensaje = document.createElement('DIV')
        divMensaje.classList.add('error')

        // Mensaje de error
        divMensaje.textContent = msg
        resultado.appendChild(divMensaje)

        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }
}

async function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda
    url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner()

    try {
        const respuesta = await fetch(url)
        cotizacion = await respuesta.json()
        mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
    } catch (error) {
        console.log(error)
    }
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML(resultado)

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion

    const precio = document.createElement('P')
    precio.classList.add('precio')
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`

    const precioAlto = document.createElement('P')
    precioAlto.innerHTML = `El precio mas alto del dia es: <span>${HIGHDAY}</span>`

    const precioBajo = document.createElement('P')
    precioBajo.innerHTML = `El precio mas bajo del dia es: <span>${LOWDAY}</span>`

    const ultimasHoras = document.createElement('P')
    ultimasHoras.innerHTML = `Variación ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`

    const ultimaActualizacion = document.createElement('P')
    ultimaActualizacion.innerHTML = `Ultima Actualización: <span>${LASTUPDATE}</span>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)
}

function limpiarHTML(referencia) {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild)
    }
}

function mostrarSpinner() {
    limpiarHTML(resultado)

    const spinner = document.createElement('DIV')
    spinner.classList.add('spinner')
    spinner.innerHTML = `
            <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
    `

    resultado.appendChild(spinner)
}