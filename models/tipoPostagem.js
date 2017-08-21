const validator = require("validator");
const mongoose = require('mongoose');

const TipoPostagemSchema = new mongoose.Schema({
    descricao: { type: String, required: true, unique: true },
    listaPostagen: [mongoose.Schema.ObjectId]
});

const TipoPostagem = mongoose.model(('TipoPostagem'), TipoPostagemSchema);

module.exports = { TipoPostagem }
