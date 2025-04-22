// Importamos el módulo 'jsonwebtoken' para trabajar con tokens JWT
import jwt from 'jsonwebtoken';
// Importamos el modelo 'Veterinario' para interactuar con la base de datos
import Veterinario from '../models/Veterinario.js';

// Definimos el middleware 'checkAuth' para verificar la autenticación
const checkAuth = async (req, res, next) => {
    let token; // Variable para almacenar el token

    // Verificamos si el encabezado de autorización existe y comienza con 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // Extraemos el token del encabezado de autorización
            token = req.headers.authorization.split(' ')[1];

            // Verificamos y decodificamos el token usando la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos al veterinario en la base de datos por el ID decodificado
            // Excluimos los campos 'password', 'token' y 'confirmado' de la respuesta
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            // Continuamos con el siguiente middleware o controlador
            return next();
        } catch (error) {
            // Si ocurre un error, enviamos una respuesta con un mensaje de token no válido
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message });
        }
    }

    // Si no hay token, enviamos una respuesta con un mensaje de token inexistente o no válido
    if (!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    // Continuamos con el siguiente middleware o controlador
    next();
}

// Exportamos el middleware para usarlo en otras partes de la aplicación
export default checkAuth;