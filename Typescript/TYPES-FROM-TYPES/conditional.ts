type StringArray = string[]
/* type ElementType<T extends any[]> = T[number]

type Example1 = ElementType<StringArray> */
let text: boolean;

type GetElementType<T> = T extends any[] ? T[number] : T;
type Example1 = GetElementType<StringArray>
type Example2 = GetElementType<typeof text>
let value: Example2;
value = false