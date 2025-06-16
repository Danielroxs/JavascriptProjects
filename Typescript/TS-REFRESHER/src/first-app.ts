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