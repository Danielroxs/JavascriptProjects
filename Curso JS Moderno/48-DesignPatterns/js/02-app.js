// Constructor Pattern

class Persona {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente extends Persona {
    constructor(nombre, email, empresa) {
        super(nombre, email);
        this.empresa = empresa;
    }
}

const cliente = new Cliente('Miguel', 'cliente@cliente.com', 'DanRoxCompany')
console.log(cliente)
const persona = new Persona('Dan', 'email@email.com')
console.log(persona)