function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
}

const juan = new Cliente('Juan', 500)

function formatearCliente(cliente) {
    const { nombre, saldo } = cliente
    return `El cliente ${nombre} tiene un saldo de ${saldo}`
}

function formatearEmpresa(empresa) {
    const { nombre, saldo, categoria } = empresa
    return `La empresa ${nombre} tiene un saldo de ${saldo} y una categoria de ${categoria}`
}

console.log(formatearCliente(juan))

function Empresa(nombre, saldo, categoria) {
    this.nombre = nombre;
    this.saldo = saldo;
    this.categoria = categoria;
}

const dan = new Empresa('Dan Rox', 4000, 'Desarrollador Web')

console.log(formatearEmpresa(dan))