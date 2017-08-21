const validator = require("validator");
const mongoose = require('mongoose');

const CidadeSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    geo: {type: [Number], index: '2d'},
});

const Cidade = mongoose.model(('Cidade'), CidadeSchema);

module.exports = { Cidade }
