const _ = require('lodash');

const { Notificacao } = require('../models/notificacao');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['texto', 'data', 'preco', 'visualizada', 'link',
	'dataGeracao']);

    var notificacao = new Notificacao(body)

    notificacao.save().then((doc) => {
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

	Notificacao.findByIdAndRemove(id).then((notificacao) => {
		if (!notificacao) {
			return res.status(404).send()
		}
		return res.send({notificacao})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['texto', 'data', 'preco', 'visualizada', 'link',
	'dataGeracao']);

	var notificacao = new Notificacao(body)

	id = notificacao._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Notificacao.findByIdAndUpdate(id, {$set: notificacao}, {new: true}).then((notificacaoEdited) => {
		if (!notificacaoEdited) {
			return res.status(404).send()
		}

		return res.send({notificacaoEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Notificacao.find().then((notificacaoList) => {
		return res.send({notificacaoList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Notificacao.findById(id).then((notificacao) => {
		if (!notificacao) {
			return res.status(404).send()		
		}
		return res.send({notificacao})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
