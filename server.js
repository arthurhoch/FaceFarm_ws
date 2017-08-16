require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const {mongoose} = require('./db/mongoose');
const { agricultorRouter } = require('./routes/agricultor');

var app = express();
app.use(bodyParser.json())

app.use('/agricultor', agricultorRouter);

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});
