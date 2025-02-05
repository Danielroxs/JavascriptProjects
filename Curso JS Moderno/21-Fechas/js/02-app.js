// Moment JS para formatear Hora y fecha

const diaHoy = new Date()

moment.locale('es')

console.log(moment().format('MMMM Do YYYY h:mm:ss a'))
console.log(moment().format('LLLL', diaHoy)) // fecha amigables en espanol

// Para cupon que finaliza en x dias
console.log(moment().add(3, 'days').calendar())