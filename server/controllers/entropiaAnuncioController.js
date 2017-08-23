const _ = require('lodash');

const { EntropiaAnuncio } = require('../models/entropiaAnuncio');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['views', 'valorPago', 'entropia']);

    var entropiaAnuncio = new EntropiaAnuncio(body)

    entropiaAnuncio.save().then((doc) => {
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

	EntropiaAnuncio.findByIdAndRemove(id).then((entropiaAnuncio) => {
		if (!entropiaAnuncio) {
			return res.status(404).send()
		}
		return res.send({entropiaAnuncio})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['views', 'valorPago', 'entropia']);

	var entropiaAnuncio = new EntropiaAnuncio(body)

	id = entropiaAnuncio._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	EntropiaAnuncio.findByIdAndUpdate(id, {$set: entropiaAnuncio}, {new: true}).then((entropiaAnuncioEdited) => {
		if (!entropiaAnuncioEdited) {
			return res.status(404).send()
		}

		return res.send({entropiaAnuncioEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	EntropiaAnuncio.find().then((entropiaAnuncioList) => {
		return res.send({entropiaAnuncioList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	EntropiaAnuncio.count({})
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

	EntropiaAnuncio.findById(id).then((entropiaAnuncio) => {
		if (!entropiaAnuncio) {
			return res.status(404).send()		
		}
		return res.send({entropiaAnuncio})
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
