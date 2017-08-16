require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require("./routes");

var app = express();
app.use('/api', routes);
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});