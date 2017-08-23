const _ = require('lodash');

const { DenunciaAnuncio } = require('../models/denunciaAnuncio');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['quantidade_denuncias', 'resolvido', 'listaMotivos',
	'_idAnuncio']);

    var denunciaAnuncio = new DenunciaAnuncio(body)

    denunciaAnuncio.save().then((doc) => {
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

	DenunciaAnuncio.findByIdAndRemove(id).then((denunciaAnuncio) => {
		if (!denunciaAnuncio) {
			return res.status(404).send()
		}
		return res.send({denunciaAnuncio})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['quantidade_denuncias', 'resolvido', 'listaMotivos',
	'_idAnuncio']);

	var denunciaAnuncio = new DenunciaAnuncio(body)

	id = denunciaAnuncio._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	DenunciaAnuncio.findByIdAndUpdate(id, {$set: denunciaAnuncio}, {new: true}).then((denunciaAnuncioEdited) => {
		if (!denunciaAnuncioEdited) {
			return res.status(404).send()
		}

		return res.send({denunciaAnuncioEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	DenunciaAnuncio.find().then((denunciaAnuncioList) => {
		return res.send({denunciaAnuncioList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	DenunciaAnuncio.count({})
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

	DenunciaAnuncio.findById(id).then((denunciaAnuncio) => {
		if (!denunciaAnuncio) {
			return res.status(404).send()		
		}
		return res.send({denunciaAnuncio})
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
