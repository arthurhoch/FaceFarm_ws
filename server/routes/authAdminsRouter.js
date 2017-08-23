const express = require('express');
const _ = require('lodash');

const { Moderador } = require('./../models/moderador');
const { Gerente } = require('./../models/gerente');

const authAdminsRouter = express.Router();

authAdminsRouter.route('/').post((req, res) => {

    var body = _.pick(req.body, ['login', 'email', 'senha']);

    Moderador.findByCredentials(body.email, body.login, body.senha).then((moderador) => {
        
        if (!moderador) {
            return res.status(404).send();
        }

        return moderador.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(moderador);
        });
    }).catch((e) => {
        Gerente.findByCredentials(body.email, body.login, body.senha).then((gerente) => {
            if (!gerente) {
                return res.status(404).send();
            }
            
            return gerente.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(gerente);
            });
        }).catch((e) => {
            console.log(e);
            return res.status(404).send();
        });
    });
});

module.exports = { authAdminsRouter };