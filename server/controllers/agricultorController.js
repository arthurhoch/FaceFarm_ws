const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 
	'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 
	'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascimento', 
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
	'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascimento', 
	'hashConfirmacao']);

	var agricultor = new Agricultor(body)

	id = agricultor._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	
	Agricultor.findByIdAndUpdate(id, {$set: agricultor}, {new: true})
	.then((agricultorEdited) => {
		if (!agricultorEdited) {
			return res.status(404).send()
		}

		return res.send({agricultorEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	var limit = parseInt(req.params.limit, 10);
	var skip = parseInt(req.params.skip, 10);

	Agricultor.find().skip(skip).limit(limit)
	.then((agricultorList) => {
		return res.send({agricultorList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Agricultor.count({})
	.then((counter) => {
		return res.send({counter})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id;
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
	count,
	getById
};
