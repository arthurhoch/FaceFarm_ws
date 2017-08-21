const validator = require("validator");
const mongoose = require('mongoose');

const ModeradorSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    cpf: { type: String, required: true, unique: true, min: 11, max: 11 },
    email: {type: String, validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }},
    telefone: { type: String },
    whattsapp: { type: String },
    bloqueado: { type: Boolean, required: true },
    visitas: { type: Number, default: 0 },
    sexo: { type: String },
    listaBanimento: [mongoose.Schema.ObjectId],
    listaNotificacao: [mongoose.Schema.ObjectId],
    listaCidade: [mongoose.Schema.ObjectId]
});

const Moderador = mongoose.model(('Moderador'), ModeradorSchema);

module.exports = { Moderador }
