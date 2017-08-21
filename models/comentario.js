const validator = require("validator");
const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    listaComentario: [mongoose.Schema.ObjectId]
});

const Comentario = mongoose.model(('Comentario'), ComentarioSchema);

module.exports = { Comentario }
