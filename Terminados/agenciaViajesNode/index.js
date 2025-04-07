/* const express = require('express');  version de common js*/
import express from 'express'
import router from './routes/index.js';

const app = express()

// Definir Puerto
const port = process.env.PORT || 4000;

// Agregar Router
app.use('/', router)


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})