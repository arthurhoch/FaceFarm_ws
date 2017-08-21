const _ = require('lodash');

const { Banimento } = require('../models/banimento');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['motivoBanimento', 'inicio', 'fim']);

    var banimento = new Banimento(body)

    banimento.save().then((doc) => {
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

	Banimento.findByIdAndRemove(id).then((banimento) => {
		if (!banimento) {
			return res.status(404).send()
		}
		return res.send({banimento})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['motivoBanimento', 'inicio', 'fim']);

	var banimento = new Banimento(body)

	id = banimento._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Banimento.findByIdAndUpdate(id, {$set: banimento}, {new: true}).then((banimentoEdited) => {
		if (!banimentoEdited) {
			return res.status(404).send()
		}

		return res.send({banimentoEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Banimento.find().then((banimentoList) => {
		return res.send({banimentoList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Banimento.findById(id).then((banimento) => {
		if (!banimento) {
			return res.status(404).send()		
		}
		return res.send({banimento})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
