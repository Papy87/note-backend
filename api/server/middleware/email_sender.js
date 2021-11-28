const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const {NODE_MAILER_CONFIG} = require('../src/config/config');
dotenv.config();

let transporter = nodemailer.createTransport(NODE_MAILER_CONFIG);
function sendNoteNotification(message, email) {
    let mailOptions = {
        from: 'Note <' + process.env.EMAIL + '>',
        to: `${email}`,
        subject: 'Notification',
        text: message
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Send email failed.')
        } else {
            console.log('Email sent successfully')
        }
    })
}


module.exports = {
    sendNoteNotification,
};
