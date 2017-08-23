const _ = require('lodash');

const { Estado } = require('../models/estado');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['nome', 'sigla', 'listaCidade']);

    var estado = new Estado(body)

    estado.save().then((doc) => {
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

	Estado.findByIdAndRemove(id).then((estado) => {
		if (!estado) {
			return res.status(404).send()
		}
		return res.send({estado})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['nome', 'sigla', 'listaCidade']);

	var estado = new Estado(body)

	id = estado._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Estado.findByIdAndUpdate(id, {$set: estado}, {new: true}).then((estadoEdited) => {
		if (!estadoEdited) {
			return res.status(404).send()
		}

		return res.send({estadoEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Estado.find().then((estadoList) => {
		return res.send({estadoList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Estado.count({})
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

	Estado.findById(id).then((estado) => {
		if (!estado) {
			return res.status(404).send()		
		}
		return res.send({estado})
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
