// Importamos el módulo de express
import express from 'express';
// Creamos una instancia del router de express
const router = express.Router();
// Importamos las funciones del controlador de veterinario
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
// Importamos el middleware de autenticación
import checkAuth from '../middleware/authMiddleware.js';

// Rutas para el área pública
// Ruta para registrar un nuevo veterinario
router.post('/', registrar);
// Ruta para confirmar la cuenta de un veterinario mediante un token
router.get('/confirmar/:token', confirmar);
// Ruta para autenticar (iniciar sesión) un veterinario
router.post('/login', autenticar);
// Ruta para solicitar el restablecimiento de contraseña
router.post('/olvide-password', olvidePassword);
// Ruta para comprobar el token y establecer una nueva contraseña
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Rutas para el área privada
// Ruta para obtener el perfil del veterinario autenticado
router.get('/perfil', checkAuth, perfil);

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación
export default router;