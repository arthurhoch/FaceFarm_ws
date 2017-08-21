const _ = require('lodash');

const { Cidade } = require('../models/cidade');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['nome', 'geo']);

    var cidade = new Cidade(body)

    cidade.save().then((doc) => {
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

	Cidade.findByIdAndRemove(id).then((cidade) => {
		if (!cidade) {
			return res.status(404).send()
		}
		return res.send({cidade})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['nome', 'geo']);

	var cidade = new Cidade(body)

	id = cidade._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Cidade.findByIdAndUpdate(id, {$set: cidade}, {new: true}).then((cidadeEdited) => {
		if (!cidadeEdited) {
			return res.status(404).send()
		}

		return res.send({cidadeEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Cidade.find().then((cidadeList) => {
		return res.send({cidadeList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Cidade.findById(id).then((cidade) => {
		if (!cidade) {
			return res.status(404).send()		
		}
		return res.send({cidade})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
