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

const juan = new Cliente('juan', 5000)
console.log(juan)
console.log(juan.mostrarInformacion())
console.log(Cliente.bienvenida())

const Cliente2 = class { // conocida class expression (son lo mismo)
    constructor(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo;
    }
    mostrarInformacion() {
        return `Cliente: ${this.nombre}, tu saldo es de: ${this.saldo}`
    }
}

const juan2 = new Cliente2('Pedro', 3000)
console.log(juan2.mostrarInformacion())