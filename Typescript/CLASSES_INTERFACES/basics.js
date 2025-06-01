"use strict";
class User {
    name;
    age;
    /* name: string;
    age: number;
 */
    constructor(name, age) {
        this.name = name;
        this.age = age;
        /* this.name = n;
        this.age = a; */
    }
}
const dan = new User('Dan', 32);

console.log(dan);
console.log("Estoy vivo!");