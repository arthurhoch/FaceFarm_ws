const validator = require("validator");
const mongoose = require('mongoose');

const Gerente = new mongoose.Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    email: {type: String, validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }},
    listaPlanoAnuncio: [mongoose.Schema.ObjectId],
    listaNotificacao: [mongoose.Schema.ObjectId]
});

module.exports = { Gerente }
