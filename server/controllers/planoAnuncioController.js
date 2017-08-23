const _ = require('lodash');

const { PlanoAnuncio } = require('../models/planoAnuncio');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['nome', 'descricao', 'valor', 'validade', 'ativo']);

    var planoAnuncio = new PlanoAnuncio(body)

    planoAnuncio.save().then((doc) => {
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

	PlanoAnuncio.findByIdAndRemove(id).then((planoAnuncio) => {
		if (!planoAnuncio) {
			return res.status(404).send()
		}
		return res.send({planoAnuncio})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['nome', 'descricao', 'valor', 'validade', 'ativo']);

	var planoAnuncio = new PlanoAnuncio(body)

	id = planoAnuncio._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	PlanoAnuncio.findByIdAndUpdate(id, {$set: planoAnuncio}, {new: true}).then((planoAnuncioEdited) => {
		if (!planoAnuncioEdited) {
			return res.status(404).send()
		}

		return res.send({planoAnuncioEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	PlanoAnuncio.find().then((planoAnuncioList) => {
		return res.send({planoAnuncioList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	PlanoAnuncio.count({})
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

	PlanoAnuncio.findById(id).then((planoAnuncio) => {
		if (!planoAnuncio) {
			return res.status(404).send()		
		}
		return res.send({planoAnuncio})
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
