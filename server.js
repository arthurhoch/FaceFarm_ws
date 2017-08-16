require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

var routes = require('./routes/agricultor');


// const routes = require("./routes");

var app = express();

app.use('/routes', routes);

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});