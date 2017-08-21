const _ = require('lodash');

const { FerramentasAgricolas } = require('../models/ferramentasAgricolas');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['nome', 'descricao', 'dataCadastro', 
	'exibirPublico', 'listaImagen']);

    var ferramentasAgricolas = new FerramentasAgricolas(body)

    ferramentasAgricolas.save().then((doc) => {
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

	FerramentasAgricolas.findByIdAndRemove(id).then((ferramentasAgricolas) => {
		if (!ferramentasAgricolas) {
			return res.status(404).send()
		}
		return res.send({ferramentasAgricolas})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['nome', 'descricao', 'dataCadastro', 
	'exibirPublico', 'listaImagen']);

	var ferramentasAgricolas = new FerramentasAgricolas(body)

	id = ferramentasAgricolas._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	FerramentasAgricolas.findByIdAndUpdate(id, {$set: ferramentasAgricolas}, {new: true}).then((ferramentasAgricolasEdited) => {
		if (!ferramentasAgricolasEdited) {
			return res.status(404).send()
		}

		return res.send({ferramentasAgricolasEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	FerramentasAgricolas.find().then((ferramentasAgricolasList) => {
		return res.send({ferramentasAgricolasList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	FerramentasAgricolas.findById(id).then((ferramentasAgricolas) => {
		if (!ferramentasAgricolas) {
			return res.status(404).send()		
		}
		return res.send({ferramentasAgricolas})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
