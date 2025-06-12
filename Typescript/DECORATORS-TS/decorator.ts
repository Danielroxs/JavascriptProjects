// DECORADORES CLASE, METODO Y CAMPO

function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
    console.log('logger decorator')
    console.log(target)
    console.log(ctx)

    return class extends target{
        constructor(...args: any[]){
            super(...args);
            console.log('class constructor')
            console.log(this)
        }
    }
}

function autobind (target: (...args: any[]) => any, ctx: ClassMethodDecoratorContext){
    ctx.addInitializer(function(this: any) {
        this[ctx.name] = this[ctx.name].bind(this)
    })

    return function(this: any){
        console.log('Executing original function')
        target.apply(this)
    }

    
}

function fieldLogger(target: undefined, ctx: ClassFieldDecoratorContext){
    console.log(target)
    console.log(ctx)
    
    return (initialValue: any) => {
        console.log(initialValue);
        return ''
    }
}

@logger
class Person {
    @fieldLogger
    name = 'Dan'

    /* constructor() {
        this.greet = this.greet.bind(this)
    } */

    @autobind
    greet() {
        console.log('Hi, I am ' + this.name)
    }
}

const dan = new Person()
const julie = new Person()
dan.greet()