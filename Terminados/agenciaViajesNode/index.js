/* const express = require('express');  version de common js*/
import express from 'express'

const app = express()

// Definir Puerto
const port = process.env.PORT || 4000;

app.get('/', (req, res) => { // req - lo que enviamos   res - lo que express nos responde, peticion y respuesta
    res.send('Inicio')
})
app.get('/nosotros', (req, res) => { // req - lo que enviamos   res - lo que express nos responde, peticion y respuesta
    res.send('Nosotros')
})
app.get('/contacto', (req, res) => { // req - lo que enviamos   res - lo que express nos responde, peticion y respuesta
    res.send('Contacto')
})

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})