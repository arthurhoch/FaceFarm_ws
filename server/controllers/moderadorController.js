const _ = require('lodash');

const { Moderador } = require('../models/moderador');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cpf', 'email',
	'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo', 'listaBanimento',
	'listaNotificacao', 'listaCidade']);

    var moderador = new Moderador(body)

    moderador.save().then((doc) => {
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

	Moderador.findByIdAndRemove(id).then((moderador) => {
		if (!moderador) {
			return res.status(404).send()
		}
		return res.send({moderador})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cpf', 'email',
	'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo', 'listaBanimento',
	'listaNotificacao', 'listaCidade']);

	var moderador = new Moderador(body)

	id = moderador._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Moderador.findByIdAndUpdate(id, {$set: moderador}, {new: true}).then((moderadorEdited) => {
		if (!moderadorEdited) {
			return res.status(404).send()
		}

		return res.send({moderadorEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Moderador.find().then((moderadorList) => {
		return res.send({moderadorList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Moderador.count({})
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

	Moderador.findById(id).then((moderador) => {
		if (!moderador) {
			return res.status(404).send()		
		}
		return res.send({moderador})
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
