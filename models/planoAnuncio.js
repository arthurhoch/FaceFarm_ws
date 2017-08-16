const validator = require("validator");
const mongoose = require('mongoose');

const PlanoAnuncio = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    descricao: { type: String, required: true},
    valor: { type: Number, required: true },
    validade: {type: Number, require: true},
    ativo: { type: Boolean, required: true }
});

module.exports = { PlanoAnuncio }
