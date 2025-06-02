"use strict";
class User1 {
    firstName;
    lastName;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
const danmax = new User1('Dan', 'Rox');
console.log(danmax.fullName);
// ------------------------------------------------------------------
class Usuario {
    _firstName = '';
    _lastName = '';
    // Setter para firstName
    set firstName(value) {
        if (value.trim().length < 2) {
            console.log("El nombre debe tener al menos 2 letras");
            return;
        }
        this._firstName = value.trim();
    }
    // Getter para firstName
    get firstName() {
        return this._firstName;
    }
    // Setter para lastName
    set lastName(value) {
        if (value.trim().length < 2) {
            console.log("El apellido debe tener al menos 2 letras");
            return;
        }
        this._lastName = value.trim();
    }
    // Getter para lastName
    get lastName() {
        return this._lastName;
    }
    // Getter combinado (solo lectura)
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }
}
// 🧪 Prueba de la clase:
const user = new Usuario();
user.firstName = "D"; // ❌ Nombre muy corto
user.lastName = "  "; // ❌ Apellido vacío
user.firstName = "Dan"; // ✅
user.lastName = "Ramírez"; // ✅
console.log(user.firstName); // "Dan"
console.log(user.lastName); // "Ramírez"
console.log(user.fullName); // "Dan Ramírez"
