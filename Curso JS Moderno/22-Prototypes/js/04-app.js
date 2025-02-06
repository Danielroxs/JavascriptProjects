function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
}

Cliente.prototype.tipoCliente = function () {
    let tipo;

    if (this.saldo > 10000) {
        tipo = 'Gold';
    } else if (this.saldo > 5000) {
        tipo = 'Platinum';
    } else {
        tipo = 'normal';
    } return tipo
}

Cliente.prototype.nombreClienteSaldo = function () {
    return `Nombre: ${this.nombre}, Saldo: ${this.saldo}, Tipo Cliente: ${this.tipoCliente()}`
}

Cliente.prototype.retiraSaldo = function (retira) {
    this.saldo -= retira
}

function Persona(nombre, saldo, telefono) {
    Cliente.call(this, nombre, saldo)
    this.telefono = telefono;
}

Persona.prototype = Object.create(Cliente.prototype)

Persona.prototype.constructor = Cliente;

// Instanciarlo
const dan = new Persona('dan', '5000', 5538055033)
console.log(dan.nombreClienteSaldo())

Persona.prototype.mostrarTelefono = function () {
    return `El telefono es ${this.telefono}`
}

console.log(dan.mostrarTelefono())