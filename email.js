
import axios from 'axios'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

    // Configuración de autenticación
    const apiKey = process.env.SENDING_BLUE_API_KEY;
    const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
    };

    // Parámetros del mensaje
    const data = {
    sender: { name: 'Lucero Concepcion', email: 'facturacion@caasd.gob.do' },
    to: [{ email: 'lucero.concepcion@caasd.gob.do' }],
    subject: 'Prueba de envío con archivo adjunto',
    htmlContent: '<p>Este es un mensaje de prueba con un archivo adjunto.</p>',
    attachment: [
        {
        name: 'attachment.pdf',
        content: fs.readFileSync('./ejemplo.pdf', { encoding: 'base64' }),
        type: 'application/pdf',
        },
    ],
    };
    // Enviar solicitud POST
    axios
    .post('https://api.sendinblue.com/v3/smtp/email', data, {
        headers: headers,
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error.response.data);
    });