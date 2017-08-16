var mongoose = require('mongoose');

var TipoPostagem = new Schema({
    descricao: { type: String, required: true, unique: true },
    listaPostagen: [Schema.Types.ObjectId]
});

module.exports = { TipoPostagem }
