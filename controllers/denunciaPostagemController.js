const _ = require('lodash');

const { DenunciaPostagem } = require('../models/denunciaPostagem');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['quantidade_denuncias','resolvido', '_idPostagem']);

    var denunciaPostagem = new DenunciaPostagem(body)

    denunciaPostagem.save().then((doc) => {
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

	DenunciaPostagem.findByIdAndRemove(id).then((denunciaPostagem) => {
		if (!denunciaPostagem) {
			return res.status(404).send()
		}
		return res.send({denunciaPostagem})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['quantidade_denuncias','resolvido', '_idPostagem']);

	var denunciaPostagem = new DenunciaPostagem(body)

	id = denunciaPostagem._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	DenunciaPostagem.findByIdAndUpdate(id, {$set: denunciaPostagem}, {new: true}).then((denunciaPostagemEdited) => {
		if (!denunciaPostagemEdited) {
			return res.status(404).send()
		}

		return res.send({denunciaPostagemEdited})
	}).catch((e) => {
		console.log(e);
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	DenunciaPostagem.find().then((denunciaPostagemList) => {
		return res.send({denunciaPostagemList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	DenunciaPostagem.findById(id).then((denunciaPostagem) => {
		if (!denunciaPostagem) {
			return res.status(404).send()		
		}
		return res.send({denunciaPostagem})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
