const validator = require("validator");
const mongoose = require('mongoose');

const DenunciaPostagem = new mongoose.Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    _idPostagem: mongoose.Schema.ObjectId
});

module.exports = { DenunciaPostagem }
