var { Gerente } = require('./../models/gerente');

var verifyGerente = (req, res, next) => {
    var token = req.header('x-auth');

    Gerente.findByToken(token).then((gerente) => {
        if (!gerente) {
            return Promise.reject();
        }

        req.gerente = gerente;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send({ cod: 'INFO_USUARIO_NAO_AUTORIZADO' })
    });
};

module.exports = { verifyGerente };