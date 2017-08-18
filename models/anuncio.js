const validator = require("validator");
const mongoose = require('mongoose');

const Anuncio = mongoose.model(('Anuncio'),{
    imagem: { type: String, required: true },
    views: { type: Number },
    cliques: { type: Number },
    valor: { type: Number},
    inicio: {    type: Date, default: Date.now },
    fim: { type: Date, required: true },
    gerente_visualizou: { type: Boolean, required: true },
    ativo: { type: Boolean, required: true },
    descricao: { type: String, required: true },
    listaEntropiaAnuncio: [mongoose.Schema.ObjectId],
    listaCultura: [mongoose.Schema.ObjectId],
    _idPlanoAnuncio: mongoose.Schema.ObjectId
});

module.exports = { Anuncio }
