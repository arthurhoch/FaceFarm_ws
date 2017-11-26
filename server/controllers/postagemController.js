const _ = require('lodash');

const { Postagem } = require('../models/postagem');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['idUsuario', 'texto', 'curtidas', 'data', 'preco', 'quantidadeTotal', 'tipo',
		'quantidadeMedida', 'unidadeMedida', 'listaComentario', 'listaCultura', 'listaImagen']);

	console.log('req.userType', req.userType)
	var postagem = new Postagem(body)
	postagem[req.userType] = req.user._id;

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
		return res.send({ postagem })
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

	Postagem.findByIdAndUpdate(id, { $set: postagem }, { new: true }).then((postagemEdited) => {
		if (!postagemEdited) {
			return res.status(404).send()
		}

		return res.send({ postagemEdited })
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Postagem.find().then((postagemList) => {
		return res.send({ postagemList })
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Postagem.count({})
		.then((counter) => {
			return res.send({ counter })
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
		return res.send({ postagem })
	}).catch((e) => res.status(400).send())
};

const getListByUsers = (req, res) => {


	const body = _.pick(req.body, ['usersIds']);
	if (body.usersIds) {
		const usersIds = body.usersIds.filter((item) => {
			if (!ObjectID.isValid(item)) {
				return false;
			}
			return true;
		});

		var populateQuery = [
			{ path: 'agricultor', select: 'nomeCompleto' },
			{ path: 'empresa', select: 'nomeCompleto' }
		];

		Postagem.find({ $or: [{ 'agricultor': { $in: [usersIds] } }, { 'empresa': { $in: [usersIds] } }] })
			.populate(populateQuery)
			.sort('-data')
			.exec().then((posts) => {
				return res.send({ posts });
			}).catch((e) => res.status(400).send({ cod: 'ERROR_LISTAR_POSTAGENS' }, e));
	} else {
		res.status(400).send({ cod: 'ERROR_LISTAR_POSTAGENS_IDS_NULL' });
	}
};

module.exports = {
	create,
	remove,
	update,
	getList,
	count,
	getById,
	getListByUsers
};
