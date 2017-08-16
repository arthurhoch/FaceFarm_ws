var mongoose = require('mongoose');

var Anuncio = new Schema({
    imagem: { type: String, required: true },
    views: { type: Number },
    cliques: { type: Number },
    valor: { type: Number},
    inicio: {    type: Date, default: Date.now },
    fim: { type: Date, required: true },
    gerente_visualizou: { type: Boolean, required: true },
    ativo: { type: Boolean, required: true },
    descricao: { type: String, required: true },
    listaEntropiaAnuncio: [Schema.Types.ObjectId],
    listaCultura: [Schema.Types.ObjectId],
    _idPlanoAnuncio: Schema.Types.ObjectId
});

module.exports = { Anuncio }
