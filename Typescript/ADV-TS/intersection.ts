// --------------- TIPOS DE INTERSECCION

type fileData = {
    path: string;
    content: string;
}

type Status = {
    isBoolean: boolean;
    errorMessage?: string;
}

type DatabaseData = {
    connectionUrl: string;
    credentials: string;
}

type AccessedFileData = fileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

// ------------------------- WITH INTERFACE

/* interface FileData {
    path: string;
    content: string;
}

interface Status {
    isBoolean: boolean;
    errorMessage?: string;
}

interface DatabaseData {
    connectionUrl: string;
    credentials: string;
}

interface AccessedFileData extends FileData, Status {}

interface AccessedDatabaseData extends DatabaseData, Status {}
 */

//---------------- TIPOS DISCRIMINADOS

type Admin = {
    role: "admin"; // <- discriminador
    accessLevel: number;
  }
  
  type Guest = {
    role: "guest"; // <- discriminador
    expiration: Date;
  }
  
  type Member = {
    role: "member"; // <- discriminador
    membershipId: string;
  }
  
  // Unión discriminada
  type User = Admin | Guest | Member;
  
  // Función que usa el discriminador
  function describeUser(user: User) {
    switch (user.role) {
      case "admin":
        console.log(`Administrador con nivel de acceso: ${user.accessLevel}`);
        break;
      case "guest":
        console.log(`Invitado, acceso expira en: ${user.expiration.toDateString()}`);
        break;
      case "member":
        console.log(`Miembro con ID: ${user.membershipId}`);
        break;
    }
  }
//-------------------------in

type User1 = { name: string };
type Admin1 = { name: string; role: string };

function isAdmin(account: User | Admin) {
  if ("role" in account) {
    // Aquí TypeScript sabe que es Admin
    console.log("Es admin:", account.role);
  } else {
    // console.log("Es usuario:", account.name);
  }
}

//-------------------------instanceof

class Dog {
    bark() {
      console.log("Guau");
    }
  }
  
  class Cat {
    meow() {
      console.log("Miau");
    }
  }
  
  function speak(pet: Dog | Cat) {
    if (pet instanceof Dog) {
      pet.bark();
    } else {
      pet.meow();
    }
  }
  