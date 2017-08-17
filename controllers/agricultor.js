const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 
	'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 
	'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascrimento', 
	'hashConfirmacao']);

    var agricultor = new Agricultor(body)

    agricultor.save().then((doc) => {
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

	Agricultor.findByIdAndRemove(id).then((agricultor) => {
		if (!agricultor) {
			return res.status(404).send()
		}
		return res.send({agricultor})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['_id', 'login', 'senha', 'nomeCompleto', 
	'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 
	'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascrimento', 
	'hashConfirmacao']);

	console.log(body);

	var agricultor = new Agricultor(body)

	id = agricultor._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	if (_.isBoolean(agricultor.completed) && agricultor.completed) {
		agricultor.completedAt = new Date().getTime();
	} else {
		agricultor.completed = false
		agricultor.completedAt = null
	}

	Agricultor.findByIdAndUpdate(id, {$set: agricultor}, {new: true}).then((agricultorEdited) => {
		if (!agricultorEdited) {
			return res.status(404).send()
		}

		return res.send({agricultorEdited})
	}).catch((e) => {
		console.log(e);
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Agricultor.find().then((agricultorList) => {
		return res.send({agricultorList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Agricultor.findById(id).then((agricultor) => {
		if (!agricultor) {
			return res.status(404).send()		
		}
		return res.send({agricultor})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};