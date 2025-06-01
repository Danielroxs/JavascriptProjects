class User {
    /* name: string;
    age: number;
 */
    public hobbies: string[] = []

    constructor(public name: string, public age: number){
        /* this.name = n;
        this.age = a; */
    }
}

const dan = new User('Dan', 32)
dan.hobbies = ['hola', 'Dan']