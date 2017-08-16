var mongoose = require('mongoose');

var Cidade = new Schema({
    nome: { type: String, required: true, unique: true },
    geo: {type: [Number], index: '2d'},
});

module.exports = { Cidade }
