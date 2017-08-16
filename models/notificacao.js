const validator = require("validator");
const mongoose = require('mongoose');

const Notificacao = new mongoose.Schema({
    texto: { type: String, required: true },
    data: {    type: Date, default: Date.now },
    preco: { type: Number },
    visualizada: { type: Boolean },
    link: { type: String },
    dataGeracao: { type: Date, default: Date.now }
});

module.exports = { Notificacao }
