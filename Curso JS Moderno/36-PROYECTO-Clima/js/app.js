const container = document.querySelector(".container")
const resultado = document.querySelector("#resultado")
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault()

    // Validar
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '') {
        // Hubo un error
        mostrarMensaje('Ambos campos son obligatorios')
        return
    }

    // Consulta a la API
    consultarAPI(ciudad, pais)
}

function mostrarMensaje(mensaje) {
    const alert = document.querySelector('.alerta')

    // Crear una alerta
    if (!alert) {
        const alerta = document.createElement('DIV')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta')
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `
        container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 5000);
    }
}

function consultarAPI(ciuad, pais) {

    Spinner() // Muestra un spinner de carga

    const appId = '6f2dc9aadc847b5be32b771eea8ae1d1'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciuad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos)

            if (datos.cod === '404') {
                mostrarMensaje('La ciudad y el pais no coinciden')
                return
            }
            // Imprime la data en el HTML
            mostrarClima(datos)

            // Resetear formulario después de la consulta
            resetearFormulario()
        })
        .catch((error) => console.error("Error al consultar la API:", error));
}

function mostrarClima(datos) {
    const { main: { temp, temp_max, temp_min }, name, sys: { country } } = datos

    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max)
    const min = kelvinACentigrados(temp_min)

    const namePais = document.createElement('P')
    namePais.innerHTML = `${name}, ${country}`
    namePais.classList.add('font-bold', 'text-7xl')

    const actual = document.createElement('P')
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('P')
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('P')
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('DIV')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(namePais)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMinima)

    limpiarHTML() // Limpiar el HTMl antes de agregar los nuevos datos
    resultado.appendChild(resultadoDiv)
}

const kelvinACentigrados = grados => parseInt(grados - 273.15)


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function resetearFormulario() {
    formulario.reset() // Reinicia todos los campos del formulario
}

function Spinner() {

    limpiarHTML()

    const divSpinner = document.createElement('DIV')
    divSpinner.classList.add('sk-circle')
    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
    `

    resultado.appendChild(divSpinner)
}