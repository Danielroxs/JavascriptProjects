let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: "Comida",
    2: "Bebidas",
    3: "Postres"
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    // Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === "")

    if (camposVacios) {
        const existeError = document.querySelector('.invalid-feedback')

        // Verifica si existe error, sino lo crea
        if (!existeError) {
            const alerta = document.createElement('DIV')
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center')
            alerta.textContent = "Todos los campos son obligatorios"
            document.querySelector('.modal-body form').appendChild(alerta)

            // Eliminar la alerta con un retraso de 3s
            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }

        return

    }

    // Asignar datos del formulario a cliente
    cliente = { ...cliente, mesa, hora }

    // Ocultar modal
    const modalFormulario = document.querySelector('#formulario')
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
    if (modalBootstrap) {
        modalBootstrap.hide()
    }

    // Mostrar las secciones
    mostrarSecciones()

    // Obtener platillos de la API  de JSON-Server
    obtenerPlatillos()
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));

}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => mostrarPlatillos(respuesta))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach(platillo => {
        const row = document.createElement('DIV')
        row.classList.add('row', 'py-3', 'border-top')

        const nombre = document.createElement('DIV')
        nombre.classList.add('col-md-4')
        nombre.textContent = platillo.nombre

        const precio = document.createElement('DIV')
        precio.classList.add('col-md-3', 'fw-bold')
        precio.textContent = `$${platillo.precio}`

        const categoria = document.createElement('DIV')
        categoria.classList.add('col-md-3')
        categoria.textContent = categorias[platillo.categoria]

        const inputCantidad = document.createElement('INPUT')
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`
        inputCantidad.classList.add('form-control')

        // Funcion que detecta la cantidad y el platillo que se esta agregando
        inputCantidad.addEventListener('change', function () {
            const cantidad = +(inputCantidad.value)
            agregarPlatillo({ ...platillo, cantidad })
        });



        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2')
        agregar.appendChild(inputCantidad)

        row.appendChild(nombre)
        row.appendChild(precio)
        row.appendChild(categoria)
        row.appendChild(agregar)

        contenido.appendChild(row)
    })

}

function agregarPlatillo(producto) {
    // Extraer el pedido actual
    let { pedido } = cliente;

    // Comprueba si el elemento ya existe en el array
    if (producto.cantidad > 0) {
        if (pedido.some(articulo => articulo.id === producto.id)) {
            // El articulo ya existe y actualizamos la cantidad
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad
                }
                return articulo
            })
            // Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];
        } else {
            // El articulo no existe y lo agregamos al array de pedido
            cliente.pedido = [...pedido, producto]
        }
    } else {
        // Eliminar elemento cuando la cantidad es cero
        const resultado = pedido.filter(articulo => articulo.id !== producto.id)
        cliente.pedido = [...resultado]
    }

    // Limpiar el HTML
    limpiarHTML()

    if (cliente.pedido.length) {
        // Mostrar el resumen
        actualizarResumen();
    } else {
        mensajePedidoVacio()
    }


}

function actualizarResumen() {
    const contenido = document.querySelector('#resumen .contenido')

    const resumen = document.createElement('DIV')
    resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow')

    // Informacion de la mesa
    const mesa = document.createElement('P')
    mesa.textContent = 'Mesa: '
    mesa.classList.add('fw-bold')

    const mesaSpan = document.createElement('SPAN')
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal')

    // Informacion de la hora
    const hora = document.createElement('P')
    hora.textContent = 'Hora: '
    hora.classList.add('fw-bold')

    const HoraSpan = document.createElement('SPAN')
    HoraSpan.textContent = cliente.hora;
    HoraSpan.classList.add('fw-normal')

    // Agregar a los elementos padre
    mesa.appendChild(mesaSpan)
    hora.appendChild(HoraSpan)

    // Titulo de la seccion
    const heading = document.createElement('H3')
    heading.textContent = 'Platillos consumidos'
    heading.classList.add('my-4', 'text-center')

    // Iterar sobre el array de pedidos
    const grupo = document.createElement('UL')
    grupo.classList.add('list-group')

    const { pedido } = cliente
    pedido.forEach(articulo => {
        const { nombre, precio, cantidad, id } = articulo

        const lista = document.createElement('LI')
        lista.classList.add('list-group-item')

        const nombreEl = document.createElement('H4')
        nombreEl.classList.add('my-4')
        nombreEl.textContent = nombre

        // Cantidad del articulo
        const cantidadEl = document.createElement('P')
        cantidadEl.classList.add('fw-bold')
        cantidadEl.textContent = 'Cantidad: '

        const cantidadValor = document.createElement('SPAN')
        cantidadValor.classList.add('fw-normal')
        cantidadValor.textContent = cantidad;

        // Precio del articulo
        const precioEl = document.createElement('P')
        precioEl.classList.add('fw-bold')
        precioEl.textContent = 'Precio: '

        const precioValor = document.createElement('SPAN')
        precioValor.classList.add('fw-normal')
        precioValor.textContent = `$${precio}`;

        // Subtotal del articulo
        const subtotalEl = document.createElement('P')
        subtotalEl.classList.add('fw-bold')
        subtotalEl.textContent = 'Subtotal: '

        const subtotalValor = document.createElement('SPAN')
        subtotalValor.classList.add('fw-normal')
        subtotalValor.textContent = calcularSubtotal(precio, cantidad);

        // Boton para eliminar
        const btnEliminar = document.createElement('BUTTON')
        btnEliminar.classList.add('btn', 'btn-danger')
        btnEliminar.textContent = "Eliminar del Pedido"

        // Funcion para eliminar del pedido
        btnEliminar.addEventListener('click', () => {
            eliminarProducto(id)
        })

        // Agregar valores a sus contenedores
        cantidadEl.appendChild(cantidadValor)
        precioEl.appendChild(precioValor)
        subtotalEl.appendChild(subtotalValor)

        // Agregar elementos al LI
        lista.appendChild(nombreEl)
        lista.appendChild(cantidadEl)
        lista.appendChild(precioEl)
        lista.appendChild(subtotalEl)
        lista.appendChild(btnEliminar)

        // Agregar Lista al Grupo Principal
        grupo.appendChild(lista)
    })

    // Agregar al contenido
    resumen.appendChild(heading)
    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(grupo)

    contenido.appendChild(resumen)

    // Mostrar formulario de propinas
    formularioPropinas()
}


function limpiarHTML() {
    const contenido = document.querySelector('#resumen .contenido')
    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }
}

function calcularSubtotal(precio, cantidad) {
    return `$${precio * cantidad}`;
}

function eliminarProducto(id) {
    const { pedido } = cliente
    const resultado = pedido.filter(articulo => articulo.id !== id)
    cliente.pedido = [...resultado]

    // Limpiar el HTML
    limpiarHTML()

    if (cliente.pedido.length) {
        // Mostrar el resumen
        actualizarResumen();
    } else {
        mensajePedidoVacio()
    }

    // El producto se elimino por lo tanto regresamos la cantidad a 0 en el formulario
    const productoEliminado = `#producto-${id}`
    const inputElimindado = document.querySelector(productoEliminado)
    inputElimindado.value = 0
}

function mensajePedidoVacio() {
    const contenido = document.querySelector('#resumen .contenido')

    const texto = document.createElement('P')
    texto.classList.add('text-center')
    texto.textContent = 'Añade los elementos del pedido'

    contenido.appendChild(texto)
}

function formularioPropinas() {
    const contenido = document.querySelector('#resumen .contenido')

    const formulario = document.createElement('DIV')
    formulario.classList.add('col-md-6', 'formulario')

    const divFormulario = document.createElement('DIV')
    divFormulario.classList.add('card', 'py-2', 'px-3', 'shadow')

    const heading = document.createElement('H3')
    heading.classList.add('my-4', 'text-center')
    heading.textContent = 'Propina'

    // Radio Button 10%
    const radio10 = document.createElement('INPUT')
    radio10.type = 'radio'
    radio10.name = 'propina'
    radio10.value = "10"
    radio10.classList.add('form-check-input')
    radio10.onclick = calcularPropina

    const radio10Label = document.createElement('LABEL')
    radio10Label.textContent = '10%'
    radio10Label.classList.add('form-check-label')

    const radio10Div = document.createElement('DIV')
    radio10Div.classList.add('form-check')

    radio10Div.appendChild(radio10)
    radio10Div.appendChild(radio10Label)

    // Radio Button 15%
    const radio15 = document.createElement('INPUT')
    radio15.type = 'radio'
    radio15.name = 'propina'
    radio15.value = "15"
    radio15.classList.add('form-check-input')
    radio15.onclick = calcularPropina

    const radio15Label = document.createElement('LABEL')
    radio15Label.textContent = '15%'
    radio15Label.classList.add('form-check-label')

    const radio15Div = document.createElement('DIV')
    radio15Div.classList.add('form-check')

    radio15Div.appendChild(radio15)
    radio15Div.appendChild(radio15Label)

    // Radio Button 20%
    const radio20 = document.createElement('INPUT')
    radio20.type = 'radio'
    radio20.name = 'propina'
    radio20.value = "20"
    radio20.classList.add('form-check-input')
    radio20.onclick = calcularPropina

    const radio20Label = document.createElement('LABEL')
    radio20Label.textContent = '20%'
    radio20Label.classList.add('form-check-label')

    const radio20Div = document.createElement('DIV')
    radio20Div.classList.add('form-check')

    radio20Div.appendChild(radio20)
    radio20Div.appendChild(radio20Label)

    // Agregar al Div Principal
    divFormulario.appendChild(heading)
    divFormulario.appendChild(radio10Div)
    divFormulario.appendChild(radio15Div)
    divFormulario.appendChild(radio20Div)

    // Agregar al Formulario
    formulario.appendChild(divFormulario)

    contenido.appendChild(formulario)
}

function calcularPropina() {

    const { pedido } = cliente
    let subtotal = 0

    // Calcular el Subtotal a pagar
    pedido.forEach(articulo => {
        subtotal += articulo.cantidad * articulo.precio;
    })

    // Seleccionar el radioButton con la propina del cliente
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value

    // Calcular la propina
    const propina = ((subtotal * +(propinaSeleccionada)) / 100)


    // Calcular el Total a Pagar
    const total = subtotal + propina;

    // Mostrar Total en HTML
    mostrarTotalHTML(subtotal, total, propina)
}

function mostrarTotalHTML(subtotal, total, propina) {

    // Div Principal
    const divTotales = document.createElement('DIV')
    divTotales.classList.add('total-pagar', 'my-5')

    // Subtotal
    const subtotalParrafo = document.createElement('P')
    subtotalParrafo.classList.add('fs-4', 'fw-bold', 'mt-2')
    subtotalParrafo.textContent = 'Subtotal Consumo: '

    const subtotalSpan = document.createElement('SPAN')
    subtotalSpan.classList.add('fw-normal')
    subtotalSpan.textContent = `$${subtotal}`

    subtotalParrafo.appendChild(subtotalSpan)

    // Propina
    const propinaParrafo = document.createElement('P')
    propinaParrafo.classList.add('fs-4', 'fw-bold', 'mt-2')
    propinaParrafo.textContent = 'Propina: '

    const propinaSpan = document.createElement('SPAN')
    propinaSpan.classList.add('fw-normal')
    propinaSpan.textContent = `$${propina}`

    propinaParrafo.appendChild(propinaSpan)

    // Total
    const totalParrafo = document.createElement('P')
    totalParrafo.classList.add('fs-4', 'fw-bold', 'mt-2')
    totalParrafo.textContent = 'Total a Pagar: '

    const totalSpan = document.createElement('SPAN')
    totalSpan.classList.add('fw-normal')
    totalSpan.textContent = `$${total}`

    totalParrafo.appendChild(totalSpan)

    // Eliminar el ultimo resultado
    const totalPagarDiv = document.querySelector('.total-pagar')

    if (totalPagarDiv) {
        totalPagarDiv.remove()
    }

    divTotales.appendChild(subtotalParrafo)
    divTotales.appendChild(propinaParrafo)
    divTotales.appendChild(totalParrafo)

    const formulario = document.querySelector('.formulario > div')
    formulario.appendChild(divTotales)
}