const validator = require("validator");
const mongoose = require('mongoose');

const DenunciaAnuncioSchema = new mongoose.Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    listaMotivos: [mongoose.Schema.ObjectId],
    _idAnuncio: mongoose.Schema.ObjectId
});

const DenunciaAnuncio = mongoose.model(('DenunciaAnuncio'), DenunciaAnuncioSchema);

module.exports = { DenunciaAnuncio }
