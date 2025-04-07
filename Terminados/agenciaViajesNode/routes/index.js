import express from 'express'

const router = express.Router()

router.get('/', (req, res) => { // req - lo que enviamos   res - lo que express nos responde, peticion y respuesta
    res.render('inicio')
})
router.get('/nosotros', (req, res) => { // req - lo que enviamos   res - lo que express nos responde, peticion y respuesta

    const viajes = 'Cambiando el texto otra vez'

    res.render('nosotros')
})

export default router;