const _ = require('lodash');

const { Empresa } = require('../models/empresa');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cnpj',
	'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo',
	'imagemPerfil', 'dataCriacaoConta', 'dataAberturaEmpresa', 'hashConfirmacao',
	'configuracao', 'listaDenunciaUsuario', 'listaCultura', 'listaPostage',
	'listaComentarios', 'listaImagen', 'listaCidade', 'listaBanimento',
	'listaNotificacao']);

    var empresa = new Empresa(body)

    empresa.save().then((doc) => {
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

	Empresa.findByIdAndRemove(id).then((empresa) => {
		if (!empresa) {
			return res.status(404).send()
		}
		return res.send({empresa})
	}).catch((e) => res.status(400).send())
};

const update = (req, res) => {
	var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cnpj',
	'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo',
	'imagemPerfil', 'dataCriacaoConta', 'dataAberturaEmpresa', 'hashConfirmacao',
	'configuracao', 'listaDenunciaUsuario', 'listaCultura', 'listaPostage',
	'listaComentarios', 'listaImagen', 'listaCidade', 'listaBanimento',
	'listaNotificacao']);

	var empresa = new Empresa(body)

	id = empresa._id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Empresa.findByIdAndUpdate(id, {$set: empresa}, {new: true}).then((empresaEdited) => {
		if (!empresaEdited) {
			return res.status(404).send()
		}

		return res.send({empresaEdited})
	}).catch((e) => {
		return res.status(400).send()
	});
};

const getList = (req, res) => {
	Empresa.find().then((empresaList) => {
		return res.send({empresaList})
	}), (e) => {
		return res.status(400).send(e)
	}
};

const getById = (req, res) => {
	var id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Empresa.findById(id).then((empresa) => {
		if (!empresa) {
			return res.status(404).send()		
		}
		return res.send({empresa})
	}).catch((e) => res.status(400).send())
};

module.exports = {
    create,
	remove,
	update,
	getList,
	getById
};
