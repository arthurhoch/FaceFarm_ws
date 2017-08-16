const validator = require("validator");
const mongoose = require('mongoose');

const TipoPostagem = new mongoose.Schema({
    descricao: { type: String, required: true, unique: true },
    listaPostagen: [mongoose.Schema.ObjectId]
});

module.exports = { TipoPostagem }
