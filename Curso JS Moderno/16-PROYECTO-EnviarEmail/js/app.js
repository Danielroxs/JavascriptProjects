document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // Seleccionar los elementos de la interfaz 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')

    // Asignar eventos
    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)

    function validar(e) {
        const id = e.target.id;
        const texto = e.target.value;
        const referencia = e.target.parentElement
        if (e.target.value.trim() === '') {
            mostrarAlerta(`el campo ${id} es obligatorio`, e.target.parentElement);
            comprobarEmail()
            return;
        }

        if (id === 'email' && !validarEmail(texto)) {
            mostrarAlerta('El email no es valido', referencia)
            comprobarEmail()
            return
        }

        limpiarAlerta(referencia)

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase()


        // Comprobar el objeto email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)

        // Generar alerta en HTML
        const error = document.createElement('P')
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar ERROR al formulario "Pintar en el HTML"
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {

        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }
})