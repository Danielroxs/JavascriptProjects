self.onload = () => {
    console.log('Ventana lista')
}

const producto = {
    nombre: 'Monitor 20 pulgadas',
    precio: 30,
    disponible: true,
    mostrarInfo: function () {
        self = this;
        return `El producto: ${self.nombre} tiene un precio de: ${self.precio}`
    }
}

console.log(producto.mostrarInfo())