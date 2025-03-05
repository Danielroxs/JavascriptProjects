const cargarAPIBtn = document.querySelector('#cargarAPI')
cargarAPIBtn.addEventListener('click', obtenerDatos)

function obtenerDatos() {
    url = 'https://picsum.photos/list'
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHMTL(resultado))
}

function mostrarHMTL(datos) {
    const contenido = document.querySelector('.contenido')

    let html = ''

    datos.forEach(perfil => {
        const { author, post_url } = perfil;

        html += `
            <p>El autor: ${author}</p>
            <a href="${post_url}"target="_blank">Ver imagen</a>
        `
    });

    contenido.innerHTML = html
}