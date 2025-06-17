let userName: string;
userName = 'fin' 

const API_KEY = 'abc'

function add(a: number, b: number){
    return a + b
}

function calculate(
    a:number,
    b:number,
    calcFn: (a:number, b:number) => number
){
    calcFn(a, b)
}

calculate(2,5,add)

interface Credentials {
    password: string;
    email: string;
}

let creds: Credentials;

creds = {
    password: 'abc',
    email: 'email@email.com'
}

// tipos literales

type Role = 'admin' | 'user' | 'editor';

let role: Role

role = 'admin'
// Type guards
function performAction(action: string, role: Role){
    if(role === "admin" && typeof role === 'string'){
        //...
    }
}

let roles: Array<Role>

roles = ['admin']

type DataStorage<T> = {
    storage: T[],
    add: (data: T) => void
}

const textStorage: DataStorage<string> = {
    storage: [],
    add(data){
        this.storage.push(data)
    }
}

function merge<T, U>(a: T, b: U){
    return {
        ...a,
        ...b
    }
}

const resultado = merge({name: 'Daniel'},{age: 32})

