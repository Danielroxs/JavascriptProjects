const paises = ['Francia', 'Espana', 'Portugal', 'Australia', 'Inglaterra']

function nuevoPais(pais, callback) {
    setTimeout(() => {
        paises.push(pais)
        callback()
    }, 4000);
}

function mostrarPaises() {
    setTimeout(() => {
        paises.forEach(pais => {
            console.log(pais)
        })
    }, 1000);
}

mostrarPaises()

nuevoPais('Alemania', mostrarPaises)