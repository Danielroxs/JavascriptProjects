import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailregistro from "../helpers/emailregistro.js";

// Función para registrar un nuevo veterinario
const registrar = async (req, res) => {
    const { email, nombre } = req.body;

    const existeUsuario = await Veterinario.findOne({ email: email });

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar el email
        emailregistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

// Función para obtener el perfil del veterinario autenticado
const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({ perfil: veterinario });
};

// Función para confirmar un usuario mediante un token
const confirmar = async (req, res) => {
    const { token } = req.params;
    console.log("este es el token", token)

    // Buscar al usuario por el token
    const usuarioConfirmar = await Veterinario.findOne({ token });

    // Caso 1: Token no válido
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null; // Eliminar el token
        usuarioConfirmar.confirmado = true; // Marcar como confirmado
        await usuarioConfirmar.save();

        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

// Función para autenticar un usuario
const autenticar = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({ token: generarJWT(usuario.id) });
    } else {
        const error = new Error('El Password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
};

// Función para manejar el caso de "olvidé mi contraseña"
const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({ email: email });
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(401).json({ msg: error.message });
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.log(error);
    }
};

// Función para comprobar si un token es válido
const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({ token: token });

    if (tokenValido) {
        res.json({ msg: 'Token valido y el usuario existe' });
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }
};

// Función para establecer un nuevo password
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
        console.log(error);
    }
};

// Exportar las funciones para usarlas en otros archivos
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
};
