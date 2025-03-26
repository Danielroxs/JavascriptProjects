// Dividir una funcion en pequenas partes/parciales
const suma = (a, b, c) => a + b + c;
/*
const parcial = a => (b, c) => suma(a, b, c)

const primerNumero = parcial(5)
const resultado = primerNumero(4, 3)
console.log(resultado) */

const parcial = a => b => c => suma(a, b, c)

const primerNumero = parcial(5);
const segundoNumero = primerNumero(4)
const resultado = segundoNumero(3)
console.log(resultado)

// Forma facil
const resultadoParcial = parcial(5)(4)(3);
console.log(resultadoParcial)

const saludar = saludo => nombre => `${saludo}, ${nombre}!`;
const saludoFormal = saludar("Buenos días");
console.log(saludoFormal("Ana")); // "Buenos días, Ana!"
