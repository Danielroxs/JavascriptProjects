class Cliente { // conocida como class declaration
    #nombre

    setNombre(nombre) {
        this.#nombre = nombre
    }

    getNombre(nombre) {
        return this.#nombre
    }

    /* constructor(nombre, saldo) {
        this.#nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion() {
        return `Cliente: ${this.#nombre}, tu saldo es de: ${this.saldo}`
    }

    static bienvenida() {
        return `Bienvenido al cajero`
    } */
}

const juan = new Cliente()
juan.setNombre('juan')
console.log(juan.getNombre())
//console.log(juan.mostrarInformacion())