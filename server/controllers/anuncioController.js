const _ = require('lodash');

const { Anuncio } = require('../models/anuncio');
const { ObjectID } = require('mongodb');

const create = (req, res) => {
	var body = _.pick(req.body, ['imagem', 'views', 'cliques', 
    'valor', 'inicio', 'fim', 'gerente_visualizou', 'ativo', 'descricao']);

    var anuncio = new Anuncio(body);

    anuncio.save().then((doc) => {
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
	Anuncio.findByIdAndRemove(id).then((anuncio) => {
		if (!anuncio) {
			return res.status(404).send()
		}
		return res.send({anuncio})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['_id', 'imagem', 'views', 'cliques', 
    'valor', 'inicio', 'fim', 'gerente_visualizou', 'ativo', 'descricao']);

	var anuncio = new Anuncio(body)

	id = anuncio._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Anuncio.findByIdAndUpdate(id, {$set: anuncio}, {new: true}).then((anuncioEdited) => {
		if (!anuncioEdited) {
			return res.status(404).send()
		}

		return res.send({anuncioEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Anuncio.find().then((anuncioList) => {
		return res.send({anuncioList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Anuncio.findById(id).then((anuncio) => {
		if (!anuncio) {
			return res.status(404).send()		
		}
		return res.send({anuncio})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
