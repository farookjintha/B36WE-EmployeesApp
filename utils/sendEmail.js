const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try{
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail.com',
            port: 587,
            secure: true,
            auth: {
              user: process.env.userEmail,
              pass: process.env.userPassword,
            },
          });

          await transporter.sendMail({
              from: process.env.userEmail,
              to: email,
              subject: subject,
              text: text
          })

          console.log('Email has been sent successfully')
          return true;
    }catch(error){
        console.log('Error: ', error)
        return false
    }
}

module.exports = sendEmail;