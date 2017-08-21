const _ = require('lodash');

const { TipoPostagem } = require('../models/tipoPostagem');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['descricao', 'listaPostagen']);

    var tipoPostagem = new TipoPostagem(body)

    tipoPostagem.save().then((doc) => {
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

	TipoPostagem.findByIdAndRemove(id).then((tipoPostagem) => {
		if (!tipoPostagem) {
			return res.status(404).send()
		}
		return res.send({tipoPostagem})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['descricao', 'listaPostagen']);

	var tipoPostagem = new TipoPostagem(body)

	id = tipoPostagem._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	TipoPostagem.findByIdAndUpdate(id, {$set: tipoPostagem}, {new: true}).then((tipoPostagemEdited) => {
		if (!tipoPostagemEdited) {
			return res.status(404).send()
		}

		return res.send({tipoPostagemEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	TipoPostagem.find().then((tipoPostagemList) => {
		return res.send({tipoPostagemList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	TipoPostagem.findById(id).then((tipoPostagem) => {
		if (!tipoPostagem) {
			return res.status(404).send()		
		}
		return res.send({tipoPostagem})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
