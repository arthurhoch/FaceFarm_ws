const _ = require('lodash');

const { Imagem } = require('../models/imagem');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['path', 'formato']);

    var imagem = new Imagem(body)

    imagem.save().then((doc) => {
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

	Imagem.findByIdAndRemove(id).then((imagem) => {
		if (!imagem) {
			return res.status(404).send()
		}
		return res.send({imagem})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['path', 'formato']);

	var imagem = new Imagem(body)

	id = imagem._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Imagem.findByIdAndUpdate(id, {$set: imagem}, {new: true}).then((imagemEdited) => {
		if (!imagemEdited) {
			return res.status(404).send()
		}

		return res.send({imagemEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Imagem.find().then((imagemList) => {
		return res.send({imagemList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const count = (req, res) => {
	Imagem.count({})
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

	Imagem.findById(id).then((imagem) => {
		if (!imagem) {
			return res.status(404).send()		
		}
		return res.send({imagem})
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
