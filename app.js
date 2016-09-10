'use strict';
require('dotenv').config();
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const
    express = require('express'),
    bParser = require('body-parser'),
    compression = require('compression'),
    sendEmail = require('./utils/sendEmail'),
    readEmail = require('./utils/readEmail');
//=============================================================================
/**
 * instantiate express
 */
//=============================================================================
const app = express();
//=============================================================================
/**
 * app config
 */
//=============================================================================
require('clarify');

const
    env = process.env.NODE_ENV,
    port = process.env.PORT;

app.disable('x-powered-by');
app.set('port', port);
app.set('env', env);
//=============================================================================
/**
 * app Middleware
 */
//=============================================================================
if(env != 'production') {
    app.use(require('morgan')('dev'));
}
app.use(bParser.json());
app.use(bParser.urlencoded({extended: true}));
app.use(compression());
//=============================================================================
/**
 * app routes
 */
//=============================================================================
app.get('/test', (req, res) => {
    return res.status(200).json('yaaaaay');
});
app.post('/send', (req, res) => {
    const
        msg = req.body.msg,
        recipient = req.body.recipient;
    return sendEmail(msg, recipient, res);
});
app.get('/read', (req, res) => {
    return readEmail(res);
});
//=============================================================================
/**
 * export module
 */
//=============================================================================
module.exports = app;
//=============================================================================
