const validator = require("validator");
const mongoose = require('mongoose');

const ConfiguracaoUsuario = new mongoose.Schema({
    visualizarPrevisaoTempo: { type: Boolean, required: true },
    visualizarCotacaoMoeda: { type: Boolean, required: true },
    visualizarComodities: { type: Boolean, required: true }
});

module.exports = { ConfiguracaoUsuario }