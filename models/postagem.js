const validator = require("validator");
const mongoose = require('mongoose');

const PostagemSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    preco: { type: Number },
    quantidadeTotal: { type: Number },
    quantidadeMedida: { type: Number },
    unidadeMedida: { type: Number },
    listaComentario: [mongoose.Schema.ObjectId],
    listaCultura: [mongoose.Schema.ObjectId],
    listaImagen: [mongoose.Schema.ObjectId]
});

const Postagem = mongoose.model(('Postagem'), PostagemSchema);

module.exports = { Postagem }
