'use strict';
//=============================================================================
/**
*module dependencies
*/
//=============================================================================
const inbox = require('inbox');
//=============================================================================
/**
 * Module core
 */
//=============================================================================
function readEmail(res) {
    const getMail = inbox.createConnection(993, process.env.IMAPHOST, {
      secureConnection: true,
      auth:{
          user: process.env.TargetEmail,
          pass: process.env.TargetEmailPassword
      }
    });

    getMail.connect();

    getMail.on('connect', () => {
      console.log('connected to the mail inbox');
      //view inbox content
      getMail.openMailbox("INBOX", {
        readOnly: true
    }, (err, info) => {
        console.log('started open INBOX');
          if(err) {
              console.log('There was an error connecting to the inbox');
              console.error(err);
              return res.status(503).json('There was an error connecting to the inbox');
          }
          else {
              const msg_count = info.count;
              console.log("Message count in INBOX: " + msg_count);
              getMail.listMessages(-10, (err, msgs) => {
                  if(err) {
                      console.log('error retrieving inbox messages');
                      console.error(err);
                      getMail.close();
                      return res.status(503).json('error retrieving inbox messages, please try later');
                  }
                  else {
                      msgs.forEach(msg => {
                          console.log(msg.UID + ": " + msg.title);
                        });
                  }
                });

              getMail.close();
              return res.status(200).json("Message count in INBOX: " + msg_count);
          }
      });
    });

    getMail.on('error', err => {
        console.log('there was an error connecting to the IMAP server');
        console.error(err);
        return res.status(500).json('There was an error connecting to the IMAP server');
    });

    getMail.on('close', () => {
        return console.log('DISCONNECTED!');
    });

};
//=============================================================================
/**
*export module
*/
//=============================================================================
module.exports = readEmail;
//=============================================================================
