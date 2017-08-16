var mongoose = require('mongoose');

var ConfiguracaoUsuario = new Schema({
    visualizarPrevisaoTempo: { type: Boolean, required: true },
    visualizarCotacaoMoeda: { type: Boolean, required: true },
    visualizarComodities: { type: Boolean, required: true }
});

module.exports = { ConfiguracaoUsuario }