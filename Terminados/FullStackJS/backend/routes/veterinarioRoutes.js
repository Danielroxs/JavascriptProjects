import express from 'express';
const router = express.Router();
import { registrar, perfil } from '../controllers/veterinarioController.js'

router.post('/', registrar)

router.get('/login', (req, res) => {
    res.send('Desde API/VETERINARIOS/LOGIN')
})

router.get('/perfil', perfil)

export default router;