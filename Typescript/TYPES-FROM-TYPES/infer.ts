// ---------Tipo de Valor de Retorno

function add(a: number, b: number){
    return a + b;
}

type AddFn = typeof add;
type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : never;

type AddFnReturnValueType = ReturnType<AddFn>