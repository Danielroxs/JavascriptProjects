import { Cliente } from "./cliente.js";

export class Empresa extends Cliente {
    constructor(nombre, ahorro, categoria) {
        super(nombre, ahorro)
        this.categoria = categoria
    }

    mostrarInformacion() {
        return `Cliente: ${this.nombre} ahorro: ${this.ahorro} y categoria ${this.categoria}`
    }
}