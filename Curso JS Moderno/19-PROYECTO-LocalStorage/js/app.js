// Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

// EventoListeners
eventListeners()
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // Cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Valor por defecto: []

        console.log(tweets)

        crearHTML()
    })
}

// Funciones
function agregarTweet(e) {
    e.preventDefault()

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value

    // Validacion del mensaje
    if (tweet === '') {
        mostrarError('El mensaje no puede estar vacio')
        return // Evita que se ejecuten mas lineas de codigo abajo

    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Agregar al arreglo de tweets
    tweets = [...tweets, tweetObj]

    // Una vez agregado vamos a crear el HTML
    crearHTML()

    // Reiniciar el formulario
    formulario.reset()
}

// Mostrar Mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // Insertarlo en el Contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X';

            // Agregar la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li')

            // Agregar el texto
            li.innerText = tweet.tweet

            // Asignar el boton
            li.appendChild(btnEliminar)

            // Agregarlo en el HTML
            listaTweets.appendChild(li)

        })
    }

    sincronizarStorage()
}

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id)
    console.log(tweets)

    crearHTML()
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}