const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')
const paginacionDiv = document.querySelector('#paginacion')

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault()

    const terminoBusqueda = document.querySelector('#termino').value

    if (terminoBusqueda === "") {
        mostrarAlerta('Agrega un termino de busqueda')
        return
    }

    buscarImagenes()
}

function mostrarAlerta(mensaje) {
    const alertaMensaje = document.createElement('P')
    const alerta = document.querySelector('.alerta')

    if (!alerta) {
        alertaMensaje.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>`
        alertaMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta')
        resultado.appendChild(alertaMensaje)

        setTimeout(() => {
            alertaMensaje.remove()
        }, 3000);
    }
}

function buscarImagenes() {

    const termino = document.querySelector('#termino').value

    const key = '29779481-aac0b169a1a05c91c01f95f65'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=4{registrosPorPagina}&page=${paginaActual}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits)
            mostrarImagenes(resultado.hits)
        })
}

// Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
function* crearPaginador(total) {
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registrosPorPagina))
}

function mostrarImagenes(imagenes) {

    limpiarHTML(resultado)

    // Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white rounded-md">
                    <img class="w-full rounded-md overflow-hidden" src="${previewURL}" />

                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me Gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>

                        <a href="${largeImageURL}" class="inline-block bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-3 hover:bg-blue-600 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                            Ver Imagen
                        </a>
                    </div>
                </div>
            </div>
        `
    });

    imprimirPaginador()

}

function imprimirPaginador() {
    limpiarHTML(paginacionDiv)
    iterador = crearPaginador(totalPaginas)

    while (true) {
        const { value, done } = iterador.next()
        if (done) return

        // Caso contrario, genera un boton por cada elemento en el generador
        const boton = document.createElement('a')
        boton.href = '#'
        boton.dataset.pagina = value
        boton.textContent = value
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded')

        boton.onclick = () => {
            paginaActual = value

            buscarImagenes()
        }

        paginacionDiv.appendChild(boton)
    }
}

function limpiarHTML(referencia) {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild)
    }
}