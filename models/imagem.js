const validator = require("validator");
const mongoose = require('mongoose');

const ImagemSchema = new mongoose.Schema({
    path: { type: String, required: true },
    formato: { type: String, required: true }
});

const Imagem = mongoose.model(('Imagem'), ImagemSchema);

module.exports = { Imagem }
