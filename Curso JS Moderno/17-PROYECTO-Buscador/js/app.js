// Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')
const formulario = document.querySelector('#buscador')

// Contenedor para los resultados
const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear()
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}



// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos) // Muestras los automoviles al cargar

    // Llena las opciones de años
    llenarSelect()
})

// Event listener para los select de busqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) => {
    const minimoValue = parseInt(e.target.value)
    const maximoValue = parseInt(datosBusqueda.maximo)

    if (minimoValue && maximoValue && minimoValue > maximoValue) {
        mostrarError('El precio mínimo no puede ser mayor que el máximo.');
        return;
    }

    datosBusqueda.minimo = minimoValue;

    filtrarAuto()
});

maximo.addEventListener('change', (e) => {
    const maximoValue = parseInt(e.target.value)
    const minimoValue = parseInt(datosBusqueda.minimo)

    if (minimoValue && maximoValue && maximoValue < minimoValue) {
        mostrarError('El precio maximo no puede ser menor que el mínimo.');
        return;
    }

    datosBusqueda.maximo = maximoValue;

    filtrarAuto()
});

function mostrarError(mensaje) {
    const error = document.createElement('P')
    error.classList.add('alerta', 'error')
    error.textContent = mensaje

    // Insertamos el mensaje de error en el DOM
    resultado.appendChild(error)

    setTimeout(() => {
        error.remove()
    }, 3000)
}

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto()
});

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto()
});

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto()
});

// Funciones
function mostrarAutos(autos) {

    limpiarHTML() // Eliminar el HTML previo

    autos.forEach(auto => {

        const { marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - ${color}
        `

        // Insertar en el HTML 
        resultado.appendChild(autoHTML)
    })
}

// Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// Genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion) // Agrega las opciones de año al select
    }
}

// Funcion que filtra en base a la busqueda - Funcion de alto nivel (toma otra funcion)
const filtrarAuto = () => {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    // console.log(resultado)

    if (resultado.length) {
        mostrarAutos(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {
    limpiarHTML()
    const noResultado = document.createElement('P')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = 'No hubo resultados...'
    resultado.appendChild(noResultado)

    setTimeout(() => {
        noResultado.remove()
    }, 5000)
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda
    if (marca) {
        return auto.marca === marca
    }

    return auto
}

function filtrarYear(auto) {
    const { year } = datosBusqueda
    console.log(typeof year)
    if (year) {
        return auto.year === year
    }

    return auto
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda
    if (minimo) {
        return auto.precio >= minimo
    }

    return auto
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda
    if (maximo) {
        return auto.precio <= maximo
    }

    return auto
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas
    }
    return auto
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision
    }
    return auto
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color
    } return auto
}