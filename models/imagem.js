var mongoose = require('mongoose');

var Imagem = new Schema({
    path: { type: String, required: true },
    formato: { type: String, required: true }
});

module.exports = { Imagem }