// Implicit Binding

const usuario = {
    nombre: 'Dan',
    edad: 32,
    informacion() {
        console.log(`Mi nombre es: ${this.nombre} y mi edad es: ${this.edad}`)
    },
    mascota: {
        nombre: 'Frijolito',
        edad: 2,
        informacion() {
            console.log(`Mi nombre es: ${this.nombre} y mi edad es: ${this.edad}`)
        }
    }
}

usuario.informacion()
usuario.mascota.informacion()