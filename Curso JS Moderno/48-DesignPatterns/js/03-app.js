// Singleton (previene que se creen varias instancias del mismo objeto)

instancia = null;

class Persona {
    constructor(nombre, email) {
        if (!instancia) {
            this.nombre = nombre;
            this.email = email;
            instancia = this;
        } else {
            return instancia;
        }
    }
}

const persona = new Persona('Juan', 'email@email.com')
console.log(persona)

const persona2 = new Persona('karen', 'karen@karen.com')
console.log(persona2)