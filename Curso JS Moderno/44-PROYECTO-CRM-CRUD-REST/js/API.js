const url = 'http://localhost:4000/clientes';

// Función para obtener el próximo ID numérico
async function obtenerProximoId() {
    const clientes = await obtenerClientes();
    if (clientes.length === 0) return 1;

    const maxId = Math.max(...clientes.map(cliente => {
        // Convertir ID a número (por si acaso viene como string)
        return Number(cliente.id);
    }));

    return maxId + 1;
}

export const nuevoCliente = async cliente => {
    try {
        // Asignar ID numérico secuencial
        cliente.id = await obtenerProximoId();

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al crear cliente');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const obtenerClientes = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener clientes');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const obtenerCliente = async id => {
    try {
        // Convertir ID a número para búsqueda consistente
        const idNum = Number(id);
        const response = await fetch(`${url}/${idNum}`);

        if (!response.ok) throw new Error('Cliente no encontrado');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const eliminarCliente = async id => {
    try {
        const idNum = Number(id);
        const response = await fetch(`${url}/${idNum}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return true;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Actualiza un registro
export const editarCliente = async cliente => {
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
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