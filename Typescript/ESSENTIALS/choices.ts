/* enum Role{
    Admin, // 0
    Editor, // 1
    Guest, // 2
} */

// let userRole: Role = 0
// let userRole: Role = Role.Admin

type Role = 'admin' | 'editor' | 'guest'
type User = {
    name: string;
    age: number;
    role: Role;
    permissions: string[]
}

let userRole: Role = 'admin'

userRole = 'editor';

let possibleResults: [1 | -1, number]; // [1, -1]

possibleResults = [1, -1]

function access(role: Role){
    //...
}
