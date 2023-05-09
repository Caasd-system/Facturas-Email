import axios from "axios";
import fs from "fs";

const headers = {
  "Content-Type": "application/json",
  "api-key": process.env.SENDING_BLUE_API_KEY,
};

const emailSender = async (name, email, attachment) => {
  // Parámetros del mensaje
  const data = {
    sender: { name, email },
    to: [{ email }],
    subject: "Prueba de envío con archivo adjunto",
    htmlContent: "<p>Este es un mensaje de prueba con un archivo adjunto.</p>",
    attachment,
  };
  // Enviar solicitud POST
  axios
    .post("https://api.sendinblue.com/v3/smtp/email", data, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.response.data);
    });
};

export default emailSender;
