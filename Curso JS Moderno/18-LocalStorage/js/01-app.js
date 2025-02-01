localStorage.setItem('nombre', 'Dan')

const producto = {
    nombre: 'Monitor 24 Pulgadas',
    precio: 300,
}

const productoString = JSON.stringify(producto)
localStorage.setItem('producto', productoString)

const meses = ['enero', 'febrero', 'marzo']
localStorage.setItem('meses', JSON.stringify(meses))