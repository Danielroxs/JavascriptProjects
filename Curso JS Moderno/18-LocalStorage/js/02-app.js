const producto = localStorage.getItem('producto')
console.log(JSON.parse(producto)) // cambiar string a objeto con parse

const meses = localStorage.getItem('meses')
const mesesArray = JSON.parse(meses)
console.log(mesesArray) // cambiar string a objeto con parse