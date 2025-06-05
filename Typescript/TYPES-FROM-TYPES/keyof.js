"use strict";
let validKey;
validKey = 'name';
validKey = 'age';
function getProp(obj, key) {
    const val = obj[key];
    if (val === undefined || val === null) {
        throw new Error('Accessing undefined or null value');
    }
    return val;
}
// keyof toma las claves (propiedades) de un tipo de objeto y las convierte en un tipo unión de strings.
const data = { id: 1, isStored: false, values: [1, -5, 10] };
const isStored = getProp(data, 'isStored');
const user = { name: 'Dan', age: 32 };
const val = getProp(user, 'age');
console.log(val);
