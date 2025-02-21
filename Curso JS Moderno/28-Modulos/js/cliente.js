export const nombreCliente = 'Dan';
export const ahorro = 200;

export function mostrarInformacion(nombreCliente, ahorro) {
    return `Cliente:${nombreCliente} y ahorro: ${ahorro}`
}

export function tieneSaldo(ahorro) {
    if (ahorro > 0) {
        console.log('Si tiene saldo')
    } else {
        console.log('No tiene saldo')
    }
}

export class Cliente {
    constructor(nombre, ahorro) {
        this.nombre = nombre
        this.ahorro = ahorro
    }

    mostrarInformacion() {
        return `Cliente:${this.nombre} y ahorro: ${this.ahorro}`
    }
}

export default function nuevaFuncion() {
    console.log('Este es el export default')
}