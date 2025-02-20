const sym = Symbol()
const sym2 = Symbol()

/* if (sym === sym2) {
    console.log('Son iguales')
} else {
    console.log('Son diferentes')
} */

const nombre = Symbol()
const apellido = Symbol()

const persona = {}

// Agrega nombre y apellido como llaves del objeto
persona[nombre] = 'Daniel'
persona[apellido] = 'Rox'
persona.tipoCliente = "Premium"
persona.saldo = 500

// console.log(persona[nombre])

// Las propiedades que utilizan un symbol no son iterables
for (let i in persona) {
    console.log(i)
}

// Definir una descripcion del symbol
const nombreCliente = Symbol('Nombre del cliente')
const cliente = {}

cliente[nombreCliente] = 'Dan'

console.log(cliente)
console.log(cliente[nombreCliente])
console.log(nombreCliente)