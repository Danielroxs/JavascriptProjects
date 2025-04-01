function Vendedor(nombre) {
    this.nombre = nombre;
    this.sala = null;
}

Vendedor.prototype = {
    oferta: (articulo, precio) => {
        console.log(`Tenemos el siguiente articulo ${articulo}, iniciamos con un precion de ${precio}`)
    },
    vendido: comprador => {
        console.log(`Vendido al comprador: ${comprador}`)
    }
}

function Comprador(nombre) {
    this.nombre = nombre;
    this.sala = null
}

Comprador.prototype = {
    oferta: (cantidad, comprador) => {
        console.log(`${comprador.nombre} : ${cantidad}`)
    }
}

function Subasta() {
    let compradores = {}

    return {
        registrar: usuario => {
            compradores[usuario.nombre] = usuario;
            usuario.sala = this
        }
    }
}

// Crear objetos

const dan = new Comprador('Dan')
const luis = new Comprador('Luis')
const vendedor = new Vendedor('Vendedor de autos')
const subasta = new Subasta()

// Tiene que registrarlos
subasta.registrar(luis)
subasta.registrar(dan)
subasta.registrar(vendedor)


vendedor.oferta('Mustang 66', 200)

dan.oferta(350, dan)
luis.oferta(450, luis)
dan.oferta(500, dan)
luis.oferta(700, luis)

vendedor.vendido('Luis')