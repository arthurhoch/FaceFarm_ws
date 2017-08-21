const validator = require("validator");
const mongoose = require('mongoose');

const DenunciaPostagemSchema = new mongoose.Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    _idPostagem: mongoose.Schema.ObjectId
});

const DenunciaPostagem = mongoose.model(('DenunciaPostagem'), DenunciaPostagemSchema);

module.exports = { DenunciaPostagem }
