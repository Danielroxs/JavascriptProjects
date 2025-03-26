// Coercion
const numero1 = 20;
const numero2 = '40'

console.log(numero1 + numero2) // Implicita, js lo hace

console.log(Number(numero2)) // Explicita yo lo manipulo
console.log(numero1.toString()) // Explicita yo lo manipulo

const pedido = [1, 2, 3, 4]
console.log(pedido.toString())
console.log(JSON.stringify(pedido))