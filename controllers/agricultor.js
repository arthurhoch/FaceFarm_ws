const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');

var create = (req ,res) => {
    var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascrimento', 'hashConfirmacao']);

    var agricultor = new Agricultor(body)

	agricultor.save().then((doc) => {
		return res.send(doc)
	}, (e) => {
		return res.status(400).send(e)
	})
}


module.exports = { create }