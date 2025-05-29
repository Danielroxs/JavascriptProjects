let userName: string
let userAge = 30

userName = 'Dan'
// userAge = '34'

function add(a: number,b = 5){
    return a + b;
}

add(10)
// add('10')
add(10, 5)