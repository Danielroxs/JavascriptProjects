class User1{
    constructor(private firstName: string, private lastName: string){}
        get fullName(){
            return this.firstName + ' ' + this.lastName
        }
}

const danmax = new User1('Dan', 'Rox')
console.log(danmax.fullName)

// ------------------------------------------------------------------ SET GET

class Usuario {
    private _firstName: string = '';
    private _lastName: string = '';
  
    // Setter para firstName
    set firstName(value: string) {
      if (value.trim().length < 2) {
        console.log("El nombre debe tener al menos 2 letras");
        return;
      }
      this._firstName = value.trim();
    }
  
    // Getter para firstName
    get firstName(): string {
      return this._firstName;
    }
  
    // Setter para lastName
    set lastName(value: string) {
      if (value.trim().length < 2) {
        console.log("El apellido debe tener al menos 2 letras");
        return;
      }
      this._lastName = value.trim();
    }
  
    // Getter para lastName
    get lastName(): string {
      return this._lastName;
    }
  
    // Getter combinado (solo lectura)
    get fullName(): string {
      return `${this._firstName} ${this._lastName}`;
    }
  }
  
  // 🧪 Prueba de la clase:
  const user = new Usuario();
  
  user.firstName = "D";       // ❌ Nombre muy corto
  user.lastName = "  ";       // ❌ Apellido vacío
  user.firstName = "Dan";     // ✅
  user.lastName = "Ramírez";  // ✅
  
  console.log(user.firstName); // "Dan"
  console.log(user.lastName);  // "Ramírez"
  console.log(user.fullName);  // "Dan Ramírez"
  
  //------------------ PROTECTED

  class Persona {
    protected nombre: string;
  
    constructor(nombre: string) {
      this.nombre = nombre;
    }
  
    presentarse() {
      console.log(`Hola, soy ${this.nombre}`);
    }
  }
  
  // Clase hija
  class Empleado extends Persona {
    private puesto: string;
  
    constructor(nombre: string, puesto: string) {
      super(nombre); // Llama al constructor de Persona
      this.puesto = puesto;
    }
  
    describirTrabajo() {
      // ✅ Podemos acceder a `nombre` porque es `protected`
      console.log(`${this.nombre} trabaja como ${this.puesto}`);
    }
  }
  
  const empleado = new Empleado("Dan", "Frontend Developer");
  
  empleado.presentarse();       // Hola, soy Dan
  empleado.describirTrabajo();  // Dan trabaja como Frontend Developer
  
  // ❌ Error: 'nombre' es protected, no puedes acceder directamente
  // console.log(empleado.nombre);
  