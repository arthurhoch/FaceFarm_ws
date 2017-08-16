const validator = require("validator");
const mongoose = require('mongoose');

const Agricultor = mongoose.model('Agricultor', {
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    cpf: { type: String, required: true, unique: true, min: 11, max: 11 },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }
    },
    telefone: { type: String },
    whattsapp: { type: String },
    bloqueado: { type: Boolean, default: false },
    visitas: { type: Number, default: 0 },
    sexo: { type: String },
    imagemPerfil: { type: String },
    dataCriacaoConta: { type: Date, default: Date.now },
    dataNascrimento: { type: Date, default: Date.now },
    hashConfirmacao: { type: String },
    configuracao: mongoose.Schema.ObjectId,
    listaDenunciaUsuario: [mongoose.Schema.ObjectId],
    listaDenunciaAnuncio: [mongoose.Schema.ObjectId],
    listaCultura: [mongoose.Schema.ObjectId],
    listaPostage: [mongoose.Schema.ObjectId],
    listaComentarios: [mongoose.Schema.ObjectId],
    listaImagen: [mongoose.Schema.ObjectId],
    listaFerramenta: [mongoose.Schema.ObjectId],
    listaCidade: [mongoose.Schema.ObjectId],
    listaBanimento: [mongoose.Schema.ObjectId],
    listaNotificacao: [mongoose.Schema.ObjectId]
});

module.exports = { Agricultor }