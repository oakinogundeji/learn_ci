'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
    nodemailer = require('nodemailer'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    os = require('os');
//=============================================================================
/**
 * module configuration
 */
//=============================================================================
const
    sgtOptions = {
      auth: {
          api_user: process.env.SendGridUsername,
          api_key: process.env.SendGridPassword
        }
      },
    mailer = nodemailer.createTransport(sgTransport(sgtOptions));
//=============================================================================
/**
 * module core
 */
//=============================================================================
function sendEmail(msg, recipient, res) {
    const email = {
      to: recipient,
      from: 'admin@example.com',
      subject: 'Your research results',
      text: 'Hi, ' + os.EOL + os.EOL +'Thanks for using the Example service, your' +
        ' research results are:' + os.EOL + os.EOL + msg
    };
    mailer.sendMail(email, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(503).json('Failure to send email, please try later')
        }
        else {
            console.log(result);
            return res.status(200).json(result.message);
        }
    });
}
//=============================================================================
/**
 * Export module
 */
//=============================================================================
module.exports = sendEmail;
//=============================================================================
