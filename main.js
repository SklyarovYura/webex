const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const data_base = require('./data-base');


data_base.connect()
    .then(function(){
    const authenticator = require('./authenticator');
    const router = require('./router');
    const app  = express();

    app.use(body_parser.json());

    app.use(session({
      secret: '1234',
      resave: false,
      saveUninitialized: true
    }));

    router(app,authenticator(app));

    app.use(express.static('public'));


    app.listen(8080);
});