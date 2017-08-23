const _ = require('lodash');

const { Motivo } = require('../models/motivo');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['motivo', 'data']);

    var motivo = new Motivo(body)

    motivo.save().then((doc) => {
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

	Motivo.findByIdAndRemove(id).then((motivo) => {
		if (!motivo) {
			return res.status(404).send()
		}
		return res.send({motivo})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['motivo', 'data']);

	var motivo = new Motivo(body)

	id = motivo._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Motivo.findByIdAndUpdate(id, {$set: motivo}, {new: true}).then((motivoEdited) => {
		if (!motivoEdited) {
			return res.status(404).send()
		}

		return res.send({motivoEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Motivo.find().then((motivoList) => {
		return res.send({motivoList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Motivo.count({})
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

	Motivo.findById(id).then((motivo) => {
		if (!motivo) {
			return res.status(404).send()		
		}
		return res.send({motivo})
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
