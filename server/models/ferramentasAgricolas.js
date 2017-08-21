const validator = require("validator");
const mongoose = require('mongoose');

const FerramentasAgricolasSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false, },
    dataCadastro: {    type: Date, default: Date.now },
    exibirPublico: { type: Boolean, default: false },
    listaImagen: [mongoose.Schema.ObjectId]
});

const FerramentasAgricolas = mongoose.model(('FerramentasAgricolas'), FerramentasAgricolasSchema);

module.exports = { FerramentasAgricolas }
