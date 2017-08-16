var mongoose = require('mongoose');

var EntropiaAnuncio = new Schema({
    views: { type: Number, required: true },
    valorPago: { type: Number, required: true },
    entropia: Number
});

module.exports = { EntropiaAnuncio }
