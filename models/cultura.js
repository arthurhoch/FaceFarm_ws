var mongoose = require('mongoose');

var Cultura = new Schema({
    nome: { type: String, required: true },
    quantidadeUsuarios: { type: Number },
});

module.exports = { Cultura }
