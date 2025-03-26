// Explicit binding

const usuario = {
    nombre: "Dan",
    edad: 32
};

function informacion() {
    console.log(`Mi nombre es: ${this.nombre} y mi edad es: ${this.edad}`);
}


const nuevaFuncion = informacion.bind(usuario);
nuevaFuncion();
// Salida: "Mi nombre es: Dan y mi edad es: 32"


//--------------------------------------------------------------------------//

function persona(el1, el2) {
    console.log(`Mi nombre es ${this.nombre} y escucho ${el1} y ${el2}`)
}

const informacion1 = {
    nombre: 'Juan'
}

const musicaFavorita = ['Heavy metal', 'Rock'];

persona.call(informacion1, musicaFavorita[0], musicaFavorita[1])
persona.apply(informacion1, musicaFavorita)

const nuevaFn = persona.bind(informacion1, musicaFavorita[0], musicaFavorita[1])
nuevaFn()