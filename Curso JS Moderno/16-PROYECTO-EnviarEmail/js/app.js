document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        cc: '', // Este campo será opcional
        asunto: '',
        mensaje: '',
    }

    // Seleccionar los elementos de la interfaz 
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc'); // Nuevo campo opcional
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    // Asignar eventos
    inputEmail.addEventListener('input', validar)
    inputCC.addEventListener('input', validar) // Agregar validación para cc
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        resetFormulario()
    })

    function enviarEmail(e) {
        e.preventDefault()
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.add('hidden')
            spinner.classList.remove('flex')

            // Reiniciar el objeto
            resetFormulario()

            // Crear una alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove();
            }, 3000)
        }, 3000)
    }

    function validar(e) {
        const id = e.target.id;
        const texto = e.target.value.trim();
        const referencia = e.target.parentElement;

        if (texto === '' && id !== 'cc') { // cc es opcional, los demás campos no
            mostrarAlerta(`El campo ${id} es obligatorio`, referencia);
            email[e.target.name] = ''
            comprobarEmail()
            return;
        }

        if ((id === 'email' || id === 'cc') && texto !== '' && !validarEmail(texto)) {
            mostrarAlerta('El email no es válido', referencia)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(referencia)

        // Asignar los valores
        email[e.target.name] = texto.toLowerCase()

        // Comprobar el objeto email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)

        // Generar alerta en HTML
        const error = document.createElement('P')
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar ERROR al formulario
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
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function comprobarEmail() {
        console.log(email);

        // Excluir `cc` de la validación de obligatoriedad
        const camposObligatorios = { ...email };
        delete camposObligatorios.cc; // cc no es obligatorio

        if (Object.values(camposObligatorios).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // Reiniciar el objeto email
        email.email = ''
        email.cc = ''
        email.asunto = ''
        email.mensaje = ''
        formulario.reset()

        comprobarEmail()
    }
})
