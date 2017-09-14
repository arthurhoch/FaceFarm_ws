const validator = require("validator");
const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const ComentarioSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    listaComentario: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comentario'
    }],
});

ComentarioSchema.methods.addComentario = function (id_comentario_pai, id_comentario_filho) {
    var Comentario = this;

    let update = { '$push' : { listaComentario: id_comentario_filho } };
    let options = { upsert: true, new: true };

    return Comentario.findByIdAndUpdate(id_comentario_pai, update, options);
};

ComentarioSchema.methods.exist = function (_id) {
    var Comentario = this;

    return new Promise( (resolve, reject) => {
        Comentario.findOne({_id}).then( (comentario) => {
            if (!comentario)
                reject(comentario);
            resolve(comentario);
        }).catch( (err) => {
            reject(err);
        });
    });
};

ComentarioSchema.plugin(idvalidator);

const Comentario = mongoose.model(('Comentario'), ComentarioSchema);

module.exports = { Comentario }
