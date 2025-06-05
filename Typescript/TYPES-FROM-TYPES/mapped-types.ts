// ------Maped types // ------- Tipos Asignados

type Operations = {
    readonly add: (a: number, b: number) => number;
    readonly substract: (a: number, b: number)  => number;
}

type Results<T> = {
    -readonly [key in keyof T]? : number
}

let mathOperations: Operations = {
    add(a: number, b: number) {
        return a + b;
    },
    substract(a: number, b: number){
        return a - b;
    }
}

let mathresults: Results<Operations> = {
    add: mathOperations.add(1, 2),
    substract: mathOperations.substract(5, 2)
}

mathresults.add = 3

