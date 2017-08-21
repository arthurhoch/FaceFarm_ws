const _ = require('lodash');

const { Cultura } = require('../models/cultura');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['nome','quantidadeUsuarios']);

    var cultura = new Cultura(body)

    cultura.save().then((doc) => {
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

	Cultura.findByIdAndRemove(id).then((cultura) => {
		if (!cultura) {
			return res.status(404).send()
		}
		return res.send({cultura})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['nome','quantidadeUsuarios']);

	var cultura = new Cultura(body)

	id = cultura._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Cultura.findByIdAndUpdate(id, {$set: cultura}, {new: true}).then((culturaEdited) => {
		if (!culturaEdited) {
			return res.status(404).send()
		}

		return res.send({culturaEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Cultura.find().then((culturaList) => {
		return res.send({culturaList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Cultura.findById(id).then((cultura) => {
		if (!cultura) {
			return res.status(404).send()		
		}
		return res.send({cultura})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
