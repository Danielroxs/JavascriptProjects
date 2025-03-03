const aplicarDescuento = new Promise((resolve, reject) => {

    const descuento = true;

    if (descuento) {
        resolve('Descuento Aplicado')
    } else {
        reject('No se pudo aplicar el descuento')
    }
})

aplicarDescuento
    .then((resultado) => descuento(resultado))
    .catch(error => console.log(error))

// Hay 3 posibles valores
// fullfilled - El promise se cumplio
// rejected - El promise no se complio
// pending - No se ha cumplido ni tampoco ha sido rechazado

function descuento(resultado) {
    console.log(resultado)
}