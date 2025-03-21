const url = 'http://localhost:4000/clientes'

// Cuando se crea un nuevo cliente
export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = 'index.html'
    } catch (error) {
        console.log(error)
    }
}

// Obtiene todos los clientes
export const obtenerCliente = async () => {
    try {
        const resultado = await fetch(url)
        const clientes = await resultado.json()
        return clientes
    } catch (error) {
        console.log(error)
    }
}

// Elimina un cliente...
export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}