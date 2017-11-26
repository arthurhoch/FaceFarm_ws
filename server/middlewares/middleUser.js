var { Agricultor } = require('./../models/agricultor');
var { Empresa } = require('./../models/empresa');
var jwtDecode = require('jwt-decode');

var verifyUser = (req, res, next) => {
    var token = req.header('x-auth');
    if (token) {
        try {
            var decoded = jwtDecode(token);
            if (decoded.userType === 'agricultor') {
                Agricultor.findByToken(token).then((agricultor) => {
                    if (!agricultor) {
                        return Promise.reject();
                    }
                    req.user = agricultor;
                    req.userType = 'agricultor'
                    req.token = token;
                    next();
                }).catch((e) => {
                    res.status(401).send({ cod: 'INFO_USUARIO_NAO_AUTORIZADO' });
                });
            } else if (decoded.userType === 'empresa') {
                Empresa.findByToken(token).then((empresa) => {
                    if (!empresa) {
                        return Promise.reject();
                    }

                    req.user = empresa;
                    req.userType = 'empresa'
                    req.token = token;
                    next();
                }).catch((e) => {
                    res.status(401).send({ cod: 'INFO_USUARIO_NAO_AUTORIZADO' });
                });
            }
        } catch (e) {
            res.status(401).send({ cod: 'INFO_USUARIO_NAO_AUTORIZADO' });
        }
    } else {
        res.status(401).send({ cod: 'INFO_USUARIO_NAO_AUTORIZADO' });
    }
};

module.exports = { verifyUser };
