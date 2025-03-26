/* const cliente = 'Dan'

function mostrarCliente() {
    console.log(cliente)
}

mostrarCliente() */

const login = true;

function clienteLoagueado() {
    const cliente = 'Dan';
    console.log(cliente)

    if (login) {
        console.log(cliente)
        const cliente = 'Pepe'
        console.log(cliente)
    }
}

clienteLoagueado()