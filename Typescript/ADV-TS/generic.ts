// ----------------GENERICOS

let names: Array<string> = ['Ana', 'Maria']

type DataStore<T> = {
    [key:string]: T}

let store: DataStore<string | boolean> = {}
    store.name = 'Dan';
    store.isInstructor = true

function merge<T, U>(a: T, b: U){
    return [a, b]
}

const ids = merge<number, string>(1,'Max')
//------------Funciones Genericas

function mergeObj<T extends object, U extends object>(a: T, b: U){
    return{...a, ...b}
}

const merged = mergeObj({userName: 'Dan'}, {age: 35})
console.log(merged)

//------------Clases Genericas

class User2 <T>{
    constructor(public id: T){}
}

const userdan = new User2('i1')

userdan.id
//------------Interfaz Genericas
interface Box<T> {
    value: T;
  }
  
  const numberBox: Box<number> = { value: 42 };
  const stringBox: Box<string> = { value: "Hola" };
  