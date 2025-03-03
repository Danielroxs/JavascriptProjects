const paises = []

const nuevoPais = pais => new Promise(resolve => {
    setTimeout(() => {
        paises.push(pais)
        resolve(`Agregado: ${pais}`)
    }, 3000);
})

nuevoPais('Alemania')
    .then(resultado => {
        console.log(resultado)
        console.log(paises)
        return nuevoPais('Mexico')
    })
    .then(resultado => {
        console.log(resultado)
        console.log(paises)
        return nuevoPais('Chile')
    })
    .then(resultado => {
        console.log(resultado)
        console.log(paises)
    })