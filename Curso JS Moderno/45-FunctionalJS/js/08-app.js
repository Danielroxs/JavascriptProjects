/* const cliente = 'Dan'

function mostrarCliente() {
    const cliente = 'Rox'
    console.log(cliente)
}

mostrarCliente() */

const obteneCliente = () => {
    const nombre = 'Dan'

    function muestraNombre() {
        console.log(nombre)
    }
    return muestraNombre;
}

const cliente = obteneCliente()

cliente()