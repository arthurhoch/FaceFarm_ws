const _ = require('lodash');

const { Postagem } = require('../models/postagem');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['texto', 'curtidas', 'data', 'preco', 'quantidadeTotal',
	'quantidadeMedida', 'unidadeMedida', 'listaComentario', 'listaCultura', 'listaImagen']);

    var postagem = new Postagem(body)

    postagem.save().then((doc) => {
        return res.send(doc)
    }, (e) => {
        return res.status(400).send(e)
    })
};

const remove = (req, res) => {
	var id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Postagem.findByIdAndRemove(id).then((postagem) => {
		if (!postagem) {
			return res.status(404).send()
		}
		return res.send({postagem})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['texto', 'curtidas', 'data', 'preco', 'quantidadeTotal',
	'quantidadeMedida', 'unidadeMedida', 'listaComentario', 'listaCultura', 'listaImagen']);

	var postagem = new Postagem(body)

	id = postagem._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Postagem.findByIdAndUpdate(id, {$set: postagem}, {new: true}).then((postagemEdited) => {
		if (!postagemEdited) {
			return res.status(404).send()
		}

		return res.send({postagemEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Postagem.find().then((postagemList) => {
		return res.send({postagemList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Postagem.findById(id).then((postagem) => {
		if (!postagem) {
			return res.status(404).send()		
		}
		return res.send({postagem})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
