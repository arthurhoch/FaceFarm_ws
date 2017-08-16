var mongoose = require('mongoose');

var DenunciaAnuncio = new Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    listaMotivos: [Schema.Types.ObjectId],
    _idAnuncio: Schema.Types.ObjectId
});

module.exports = { DenunciaAnuncio }
