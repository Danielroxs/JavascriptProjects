import nuevaFuncion, { ahorro, nombreCliente, tieneSaldo, Cliente } from "./cliente.js";
/* import nuevaFuncion, { ahorro as dinero, nombreCliente as cliente, tieneSaldo, Cliente } from "./cliente.js"; // Alias */
import { mostrarInformacion } from "./cliente.js";
import { Empresa } from "./empresa.js";

nuevaFuncion()

const empresa = new Empresa('Dan,', 5000, 'WebDevelopment');

console.log(empresa.mostrarInformacion())

console.log(mostrarInformacion(nombreCliente, ahorro))
tieneSaldo(ahorro)

const cliente = new Cliente(nombreCliente, ahorro)

console.log(cliente.mostrarInformacion())