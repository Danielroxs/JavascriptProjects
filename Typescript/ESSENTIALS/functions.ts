function add(a: number, b: number): number {
    return a + b;
}

function log(message: string): void {
    console.log(message)
}

function logAndThrow(errorMessage: string): never {
    console.log(errorMessage)
    throw new Error(errorMessage)
}

const logged = logAndThrow('Hi')

const logMsg = (msg: string) => {
    console.log(msg)
}

function performJob(cb: (msg: string) => void){
    cb('Job Done')
}

performJob(logMsg)

type Users = {
    name: string;
    age: number;
    greet: () => string;
}

let user: Users = {
    name: 'Max',
    age: 39,
    // greet: () => {}
    greet() {
        console.log('Hello there')
        return this.name
    },
}

user.greet()