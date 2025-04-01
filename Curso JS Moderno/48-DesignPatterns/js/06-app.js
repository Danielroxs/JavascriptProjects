// Mixins 

class Persona {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

const funcionesPersona = {
    mostrarInformacion() {
        console.log(`Nombre: ${this.nombre} Email: ${this.email}`)
    },
    mostrarNombre() {
        console.log(`Mi nombre es: ${this.nombre}`)
    }
}

Object.assign(Persona.prototype, funcionesPersona)
Object.assign(Cliente.prototype, funcionesPersona)

const persona = new Persona('Dan', 'email@email.com')
console.log(persona)

persona.mostrarInformacion()
persona.mostrarNombre()

const cliente = new Cliente('cliente', 'cliente@cliente.com')
console.log(cliente)

cliente.mostrarInformacion()
cliente.mostrarNombre()

