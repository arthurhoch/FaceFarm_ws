const validator = require("validator");
const mongoose = require('mongoose');

const Cultura = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidadeUsuarios: { type: Number },
});

module.exports = { Cultura }
