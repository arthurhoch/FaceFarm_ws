const validator = require("validator");
const mongoose = require('mongoose');

const Imagem = new mongoose.Schema({
    path: { type: String, required: true },
    formato: { type: String, required: true }
});

module.exports = { Imagem }