import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    const { email } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email: email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }

    res.json({ msg: 'registrando usuario...' })
}

const perfil = (req, res) => {
    res.json({ msg: 'Mostrando Perfil...' })
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    // Buscar el usuario con el token proporcionado
    const usuarioConfirmar = await Veterinario.findOne({ token: token });

    // Si no se encuentra el usuario, devolver un error
    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Modificar las propiedades del usuario
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        // Guardar los cambios en la base de datos
        await usuarioConfirmar.save();

        // Responder al cliente
        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al confirmar el usuario" });
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body

    // Comprobar si el usuario existe 
    const usuario = await Veterinario.findOne({ email })

    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(400).json({ msg: error.message })
    }

    // El usuario no esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({ msg: error.message })
    }

    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
        // Autenticar JWT
    } else {
        const error = new Error('El Password es incorrecto')
        return res.status(403).json({ msg: error.message })
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}