const validator = require("validator");
const mongoose = require('mongoose');

const FerramentasAgricolas = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false, },
    dataCadastro: {    type: Date, default: Date.now },
    exibirPublico: { type: Boolean, default: false },
    listaImagen: [mongoose.Schema.ObjectId]
});

module.exports = { FerramentasAgricolas }
