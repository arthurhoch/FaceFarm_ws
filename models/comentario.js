const validator = require("validator");
const mongoose = require('mongoose');

const Comentario = new mongoose.Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    listaComentario: [mongoose.Schema.ObjectId]
});

module.exports = { Comentario }
