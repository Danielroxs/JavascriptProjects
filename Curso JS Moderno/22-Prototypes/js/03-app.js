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

// Instanciarlo
const dan = new Cliente('Dan', 6000)

console.log(dan.tipoCliente())
console.log(dan)
console.log(dan.nombreClienteSaldo())
dan.retiraSaldo(1000)
console.log(dan.nombreClienteSaldo())

/* function Empresa(nombre, saldo, categoria) {
    this.nombre = nombre;
    this.saldo = saldo;
    this.categoria = categoria;
}

const empresa = new Empresa('Dan Rox', 4000, 'Desarrollador Web')
console.log(empresa)
 */