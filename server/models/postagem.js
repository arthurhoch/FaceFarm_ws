const validator = require("validator");
const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const PostagemSchema = new mongoose.Schema({
    texto: { type: String },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    preco: { type: Number },
    quantidadeTotal: { type: Number },
    tipo: { type: String, required: true },
    quantidadeMedida: { type: Number },
    unidadeMedida: { type: String },
    cultura: { type: String},
    agricultor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Agricultor'
    },
    empresa: {
        type: mongoose.Schema.ObjectId,
        ref: 'Empresa'
    },
    listaImagen: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Imagem'
    }]
});

PostagemSchema.methods.addComentario = function (id_postagem, id_comentario) {
    var Postagem = this;

    let update = { '$push' : { listaComentario: id_comentario } };
    let options = { upsert: true, new: true };

    return Postagem.findByIdAndUpdate(id_postagem, update, options);
};

PostagemSchema.methods.exist = function (_id) {
    var Postagem = this;

    return new Promise( (resolve, reject) => {
        Postagem.findOne({_id}).then( (postagem) => {
            if (!postagem)
                reject(postagem);
            resolve(postagem);
        }).catch( (err) => {
            reject(err);
        });
    });
};

PostagemSchema.plugin(idvalidator);

const Postagem = mongoose.model(('Postagem'), PostagemSchema);

module.exports = { Postagem }
