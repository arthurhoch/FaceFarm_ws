const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');

var create = (req, res) => {

	console.log(req.body);

    var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascrimento', 'hashConfirmacao']);

	console.log(JSON.stringify(body, undefined, 4));

    var agricultor = new Agricultor(body)

	agricultor.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
}


module.exports = { create }