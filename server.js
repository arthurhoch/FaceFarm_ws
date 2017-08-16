require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

const { route } = require('./routes/agricultor');

var app = express();

app.use('/api', route);

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});
