const express = require('express');
const _ = require('lodash');

const { Moderador } = require('./../models/moderador');
const { Gerente } = require('./../models/gerente');
const { Agricultor } = require('./../models/agricultor');
const { Empresa } = require('./../models/empresa');

const authRouter = express.Router();

authRouter.route('/admins').post((req, res) => {

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

authRouter.route('/users').post((req, res) => {
    var body = _.pick(req.body, ['login', 'email', 'senha']);

    Empresa.findByCredentials(body.email, body.login, body.senha).then((empresa) => {
        if (!empresa) {
            return res.status(404).send();
        }

        return empresa.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(empresa);
        });
    }).catch((e) => {
        Agricultor.findByCredentials(body.email, body.login, body.senha).then((agricultor) => {
            if (!agricultor) {
                return res.status(404).send();
            }
            
            return agricultor.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(agricultor);
            });
        }).catch((e) => {
            console.log(e);
            return res.status(404).send();
        });
    });
});

module.exports = { authRouter };