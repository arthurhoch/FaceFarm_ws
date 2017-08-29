const validator = require("validator");
const mongoose = require('mongoose');
const _ = require('lodash');

const SeguindoSchema = new mongoose.Schema({
    id_usuario: mongoose.Schema.ObjectId,
    seguindoList: [mongoose.Schema.ObjectId]
});

/**
 * id_usuario -> Usuario atual
 * id_seguindo -> Usuario que vai ser seguido pelo usuario atual
 */

SeguindoSchema.statics.seguir = function(id_usuario, id_seguindo) {
    var Seguindo = this;

    console.log(Seguindo.seguindoList);

    var query = {
        _id: id_usuario,
        seguindoList: { $ne: id_seguindo }
    };
    var update = { $push: { seguindoList: id_seguindo } }
    var options = { upsert: true, new: true };

    return Seguindo.findOneAndUpdate(query, update, options);
};

const Seguindo = mongoose.model(('Seguindo'), SeguindoSchema);

module.exports = { Seguindo }