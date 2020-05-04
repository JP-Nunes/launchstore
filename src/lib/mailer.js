const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: "e0b7a17e8ee229",
     pass: "ef27615e4da41b"
   }
});

module.exports = transport