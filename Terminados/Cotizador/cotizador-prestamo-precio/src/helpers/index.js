const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(valor)
}

const calcularTotalPagar = (cantidad, plazo) => {

    const factoresCantidad = [
        { limite: 5000, factor: 1.5 },
        { limite: 10000, factor: 1.4 },
        { limite: 15000, factor: 1.3 },
        { limite: Infinity, factor: 1.2 },
    ];

    const factoresPlazo = {
        6: 1.1,
        12: 1.2,
        24: 1.3,
    }

    // Determinar el factor segun la cantidad
    const factorCantidad = factoresCantidad.find(f => cantidad < f.limite).factor

    // Determinar el factor segun el plazo
    const factorPlazo = factoresPlazo[plazo] || 1.3 // valor por defecto si el plazo no coincide

    // Calcular el total
    return cantidad * factorCantidad * factorPlazo

}

export {
    formatearDinero,
    calcularTotalPagar
}