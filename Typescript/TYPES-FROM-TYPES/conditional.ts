type StringArray = string[]
/* type ElementType<T extends any[]> = T[number]

type Example1 = ElementType<StringArray> */
let text: boolean;

type GetElementType<T> = T extends any[] ? T[number] : T;
type Example1 = GetElementType<StringArray>
type Example2 = GetElementType<typeof text>
let value: Example2;
value = false

type FullNamePerson = {firstName: string, lastName: string}
type FullNameOrNothing<T> = T extends FullNamePerson ? string : never

function getFullName<T extends object>(person: T ): FullNameOrNothing<T> {
    if ('firstName' in person &&
        'lastName' in person && 
        person.firstName && 
        person.lastName
    ) {
        return `${person.firstName} ${person.lastName}` as FullNameOrNothing<T>
    }
    throw new Error('No first name and/or last name found')
}
/* 
const name1 = getFullName({})
const name2 = getFullName({firstName: 'Rox'})
const name3 = getFullName({firstName: 'Rox', lastName: 'Dan'}) */