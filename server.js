const express = require('express');

const middlewareAuthenticate = require("./middleware/authenticate")

var app = express();

app.use((req, res, next) => {
    // middlewareAuthenticate.authenticate(req, res, next);
});

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});