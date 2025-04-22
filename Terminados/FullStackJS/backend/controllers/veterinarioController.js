// Importar el modelo de Veterinario
import Veterinario from "../models/Veterinario.js";
// Importar el helper para generar JWT
import generarJWT from "../helpers/generarJWT.js";
// Importar el helper para generar un ID único
import generarId from "../helpers/generarId.js";

// Función para registrar un nuevo veterinario
const registrar = async (req, res) => {
    const { email } = req.body;

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email: email });

    if (existeUsuario) {
        // Si el usuario ya existe, devolver un error
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo veterinario en la base de datos
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Responder con el veterinario guardado
        res.json(veterinarioGuardado);
    } catch (error) {
        // Capturar y mostrar cualquier error que ocurra
        console.log(error);
    }

    // Respuesta por defecto (no se ejecutará debido al `return` anterior)
    res.json({ msg: 'registrando usuario...' });
};

// Función para obtener el perfil del veterinario autenticado
const perfil = (req, res) => {
    const { veterinario } = req;
    // Responder con el perfil del veterinario
    res.json({ perfil: veterinario });
};

// Función para confirmar un usuario mediante un token
const confirmar = async (req, res) => {
    const { token } = req.params;

    // Buscar el usuario con el token proporcionado
    const usuarioConfirmar = await Veterinario.findOne({ token: token });

    if (!usuarioConfirmar) {
        // Si no se encuentra el usuario, devolver un error
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Modificar las propiedades del usuario
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        // Guardar los cambios en la base de datos
        await usuarioConfirmar.save();

        // Responder al cliente indicando que el usuario fue confirmado
        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        // Capturar y mostrar cualquier error que ocurra
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al confirmar el usuario" });
    }
};

// Función para autenticar un usuario
const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        // Si no existe, devolver un error indicando que el usuario no fue encontrado
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    // Verificar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
        // Si el password es correcto, generar un JWT y responder con él
        res.json({ token: generarJWT(usuario.id) });
    } else {
        // Si el password es incorrecto, devolver un error
        const error = new Error('El Password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
};

// Función para manejar el caso de "olvidé mi contraseña"
const olvidePassword = async (req, res) => {
    const { email } = req.body;

    // Buscar al veterinario por su email
    const existeVeterinario = await Veterinario.findOne({ email: email });
    if (!existeVeterinario) {
        // Si no existe, devolver un error
        const error = new Error('El usuario no existe');
        return res.status(401).json({ msg: error.message });
    }

    try {
        // Generar un nuevo token único para el usuario
        existeVeterinario.token = generarId();
        // Guardar el usuario con el nuevo token en la base de datos
        await existeVeterinario.save();
        // Enviar una respuesta al cliente indicando que se envió un email con instrucciones
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        // Capturar y mostrar cualquier error que ocurra durante el proceso
        console.log(error);
    }
};

// Función para comprobar si un token es válido
const comprobarToken = async (req, res) => {
    const { token } = req.params;

    // Buscar un veterinario en la base de datos que coincida con el token proporcionado
    const tokenValido = await Veterinario.findOne({ token: token });

    if (tokenValido) {
        // Si el token es válido, responder indicando que el usuario existe
        res.json({ msg: 'Token valido y el usuario existe' });
    } else {
        // Si el token no es válido, devolver un error
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }
};

// Función para establecer un nuevo password
const nuevoPassword = async (req, res) => {
    console.log('REQ.BODY:', req.body);

    const { token } = req.params;
    console.log(token);
    // Extraer el password del cuerpo de la solicitud
    const { password } = req.body;

    // Buscar al veterinario por su token
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        // Si no se encuentra, devolver un error
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Actualizar el token y el password del veterinario
        veterinario.token = null;
        veterinario.password = password;
        // Guardar los cambios realizados en la base de datos
        await veterinario.save();
        // Responder indicando que el password fue modificado correctamente
        res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
        // Capturar y mostrar cualquier error que ocurra
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