import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next();
        } catch (error) {
            return res.status(403).json({ msg: 'Token no válido' });
        }
    }

    if (!token) {
        return res.status(403).json({ msg: 'Token no válido o inexistente' });
    }

    next();
};

export default checkAuth;
