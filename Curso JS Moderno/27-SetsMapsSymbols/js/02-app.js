// WeakSet

const weakset = new WeakSet()

const cliente = {
    nombre: 'juan',
    saldo: 100,
}

weakset.add(cliente)
// weakset.delete(cliente)
console.log(weakset.has(cliente))
console.log(weakset.size)

