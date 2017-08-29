const validator = require("validator");
const mongoose = require('mongoose');
const _ = require('lodash');

const SeguindoSchema = new mongoose.Schema({
    id_usuario: mongoose.Schema.ObjectId,
    seguindoList: [mongoose.Schema.ObjectId]
});

SeguindoSchema.statics.seguir = function(id) {
    var Seguindo = this;

    console.log(Seguindo.seguindoList);

    if (Seguindo.seguindoList) {
        Seguindo.seguindoList.push(id);
    } else {
        return new Promise().reject();
    }

    return Seguindo.save().then(() => {
        return id;
    });
};

const Seguindo = mongoose.model(('Seguindo'), SeguindoSchema);

module.exports = { Seguindo }