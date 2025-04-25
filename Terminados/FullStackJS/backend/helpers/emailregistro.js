import nodemailer from 'nodemailer'

const emailregistro = (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    console.log(datos)

    // Enviar el email

}

export default emailregistro;