var mongoose = require('mongoose');

var Empresa = new Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    cnpj: { type: String, required: true, unique: true, min: 14, max: 14 },
    email: {type: String, validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }},
    telefone: { type: String },
    whattsapp: { type: String },
    bloqueado: { type: Boolean, required: true },
    visitas: { type: Number, default: 0 },
    sexo: { type: String },
    imagemPerfil: { type: String  },
    dataCriacaoConta: {    type: Date, default: Date.now },
    dataAberturaEmpresa: { type: Date, default: Date.now },
    hashConfirmacao: { type: String},
    configuracao: Schema.Types.ObjectId,
    listaDenunciaUsuario: [Schema.Types.ObjectId],
    listaCultura: [Schema.Types.ObjectId],
    listaPostage: [Schema.Types.ObjectId],
    listaComentarios: [Schema.Types.ObjectId],
    listaImagen: [Schema.Types.ObjectId],
    listaCidade: [Schema.Types.ObjectId],
    listaBanimento: [Schema.Types.ObjectId],
    listaNotificacao: [Schema.Types.ObjectId],
});

module.exports = { Empresa }
