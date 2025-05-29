let hobbies = ['LimaLama', 'Box']

// hobbies.push(10)

// let users: (string | number)[]
let users: Array<string | number>

users = [1, 'Max']
users = ['Dan', 'Max']
users = [1, 2]

let posibleResults: [number, number]

posibleResults = [1, -1]


let user: {
    name: string;
    age: number;
    hobbies: string[];
    role: {
        description: string;
        id: number;
    }
} = {
    name: 'Dan',
    age: 32,
    hobbies: ['LimaLama', 'Box'],
    role: {
        description: 'admin',
        id: 5
    }
}

let val: {} = 'is a value'

let data: Record<string, number | string>

data = {
    perfil: 42342,
    age: "tercera edad"
}