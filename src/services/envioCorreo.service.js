import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: 'C:\Users\Maxi(Temporal)\Downloads\MEDRES main 14-10\Proyecto-MedRes\MEDRES.env' }); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "medreshotelmediterraneo@gmail.com",
    pass: "MedResHotelMediterraneo12345",
  },
});

// Función para enviar el correo de recuperación
const sendRecoveryEmail = async (email, recoveryLink) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER, // De quién proviene el correo
      to: email, // Dirección de correo del destinatario
      subject: 'Recuperación de cuenta',
      html: `
        <p>Hola,</p>
        <p>Parece que solicitaste recuperar tu cuenta. Haz clic en el enlace para cambiar tu contraseña:</p>
        <a href="${recoveryLink}">Recuperar contraseña</a>
        <p>Si no fuiste tú, simplemente ignora este correo.</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

const envioCorreo_services = {
  sendRecoveryEmail,
};

export { envioCorreo_services };
