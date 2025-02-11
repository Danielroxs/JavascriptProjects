class Cliente { // conocida como class declaration
    constructor(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion() {
        return `Cliente: ${this.nombre}, tu saldo es de: ${this.saldo}`
    }

    static bienvenida() {
        return `Bienvenido al cajero`
    }
}

// Herencia
class Empresa extends Cliente {
    constructor(nombre, saldo, telefono, categoria) {
        super(nombre, saldo)
        this.telefono = telefono;
        this.categoria = categoria;
    }

    mostrarInformacion() { // Reescribir un metodo de la clase padre
        return `Cliente: ${this.nombre}, tu saldo ahora mismo de: ${this.saldo}`
    }

    static bienvenida() {
        return `Bienvenido al mundo`
    }
}

const juan = new Cliente('juan', 5000)
const empresa = new Empresa('Logical Business', 5000000, 555555, 'VIP')
console.log(empresa)
console.log(empresa.mostrarInformacion())
console.log(Empresa.bienvenida())