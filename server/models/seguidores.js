const validator = require("validator");
const mongoose = require('mongoose');
const _ = require('lodash');

const SeguidoresSchema = new mongoose.Schema({
    id_usuario: mongoose.Schema.ObjectId,
    seguidoresList: [mongoose.Schema.ObjectId]
});

/**
 * id_usuario -> Usuario atual
 * id_seguidores -> Usuario que esta seguindo o usuario atual
 */

SeguidoresSchema.statics.adicionarSeguidor = function(id_usuario, id_seguidor) {
    var Seguidores = this;

    console.log(Seguidores.seguidoresList);

    var query = {
        _id: id_usuario,
        seguidoresList: { $ne: id_seguidor }
    };
    var update = { $push: { seguidoresList: id_seguidor } }
    var options = { upsert: true, new: true };

    return Seguidores.findOneAndUpdate(query, update, options);
};

const Seguidores = mongoose.model(('Seguidores'), SeguidoresSchema);

module.exports = { Seguidores }