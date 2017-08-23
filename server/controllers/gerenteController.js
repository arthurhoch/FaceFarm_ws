const _ = require('lodash');

const { Gerente } = require('../models/gerente');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'email',
	'listaPlanoAnuncio', 'listaNotificacao']);

    var gerente = new Gerente(body)

    gerente.save().then((doc) => {
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

	Gerente.findByIdAndRemove(id).then((gerente) => {
		if (!gerente) {
			return res.status(404).send()
		}
		return res.send({gerente})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'email',
	'listaPlanoAnuncio', 'listaNotificacao']);

	var gerente = new Gerente(body)

	id = gerente._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Gerente.findByIdAndUpdate(id, {$set: gerente}, {new: true}).then((gerenteEdited) => {
		if (!gerenteEdited) {
			return res.status(404).send()
		}

		return res.send({gerenteEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Gerente.find().then((gerenteList) => {
		return res.send({gerenteList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Gerente.count({})
	.then((counter) => {
		return res.send({counter})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Gerente.findById(id).then((gerente) => {
		if (!gerente) {
			return res.status(404).send()		
		}
		return res.send({gerente})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	count,
	getById
};
