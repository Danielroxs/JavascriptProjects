import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    const { email } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email: email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }

    res.json({ msg: 'registrando usuario...' })
}

const perfil = (req, res) => {
    res.json({ msg: 'Mostrando Perfil...' })
}

export {
    registrar,
    perfil
}