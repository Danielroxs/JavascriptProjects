const cliente = new Map()

cliente.set('nombre', 'Karen')
cliente.set('tipo', 'Premium')
cliente.set('saldo', 3000)

cliente.delete('saldo')
console.log(cliente.size)
console.log(cliente.has('saldo'))
console.log(cliente.get('saldo'))

cliente.clear()

console.log(cliente)

const cliente2 = new Map([['nombre', 'Daniel'], ['habitacion', 12]])

cliente2.set('dia', 'martes')
cliente2.set('Doctor', 'Bien')

cliente2.forEach((datos, index) => {
    console.log(index)
});
