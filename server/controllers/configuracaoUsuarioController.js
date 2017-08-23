const _ = require('lodash');

const { ConfiguracaoUsuario } = require('../models/configuracaoUsuario');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['visualizarPrevisaoTempo', 'visualizarCotacaoMoeda',
	'visualizarComodities']);

    var configuracaoUsuario = new ConfiguracaoUsuario(body)

    configuracaoUsuario.save().then((doc) => {
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

	ConfiguracaoUsuario.findByIdAndRemove(id).then((configuracaoUsuario) => {
		if (!configuracaoUsuario) {
			return res.status(404).send()
		}
		return res.send({configuracaoUsuario})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['visualizarPrevisaoTempo', 'visualizarCotacaoMoeda',
	'visualizarComodities']);

	var configuracaoUsuario = new ConfiguracaoUsuario(body)

	id = configuracaoUsuario._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	ConfiguracaoUsuario.findByIdAndUpdate(id, {$set: configuracaoUsuario}, {new: true}).then((configuracaoUsuarioEdited) => {
		if (!configuracaoUsuarioEdited) {
			return res.status(404).send()
		}

		return res.send({configuracaoUsuarioEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	ConfiguracaoUsuario.find().then((configuracaoUsuarioList) => {
		return res.send({configuracaoUsuarioList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	ConfiguracaoUsuario.count({})
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

	ConfiguracaoUsuario.findById(id).then((configuracaoUsuario) => {
		if (!configuracaoUsuario) {
			return res.status(404).send()		
		}
		return res.send({configuracaoUsuario})
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
