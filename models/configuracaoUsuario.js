const validator = require("validator");
const mongoose = require('mongoose');

const ConfiguracaoUsuarioSchema = new mongoose.Schema({
    visualizarPrevisaoTempo: { type: Boolean, required: true },
    visualizarCotacaoMoeda: { type: Boolean, required: true },
    visualizarComodities: { type: Boolean, required: true }
});

const ConfiguracaoUsuario = mongoose.model(('ConfiguracaoUsuario'), ConfiguracaoUsuarioSchema);

module.exports = { ConfiguracaoUsuario }
