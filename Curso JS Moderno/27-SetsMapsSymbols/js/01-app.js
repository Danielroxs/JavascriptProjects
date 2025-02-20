// Set
const carrito = new Set();

carrito.add('camisa1')
carrito.add('camisa2')
carrito.add('camisa3')
// carrito.delete('camisa1')
console.log(carrito.has('Camisa'))

// carrito.clear()

carrito.forEach(producto => {
    console.log(producto)
})

console.log(carrito)

const numerosDuplicados = [10, 10, 20, 30, 40, 50, 60, 60]
const numerosNoDuplicados = new Set(numerosDuplicados)
console.log(numerosNoDuplicados)