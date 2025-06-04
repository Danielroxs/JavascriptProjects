"use strict";
const userName = 'Dan';
console.log(typeof userName);
//------- tipado personalizado automatico con typeof
const settings = {
    difficulty: 'easy',
    minLevel: 10,
    didStart: false,
    players: ['Jhon', 'Jane']
};
// type Settings = typeof settings o bien abajo directamente en la funcion
function loadedData(setting) { }
