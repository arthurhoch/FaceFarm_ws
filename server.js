require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const {mongoose} = require('./db/mongoose');
const { agricultorRouter } = require('./routes/agricultorRoute');
const { anuncioRouter } = require('./routes/anuncioRoute');

var app = express();
app.use(bodyParser.json())

app.use('/agricultor', agricultorRouter);
app.use('/anuncio', anuncioRouter);

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});
