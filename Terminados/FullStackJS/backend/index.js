import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()


app.use("/api/veterinarios", veterinarioRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando el el puerto ${PORT}`)
})