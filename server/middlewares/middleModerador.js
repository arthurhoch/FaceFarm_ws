var { Moderador } = require('./../models/moderador');

var verifyModerador = (req, res, next) => {
    var token = req.header('x-auth');

    Moderador.findByToken(token).then((moderador) => {
        if (!moderador) {
            return Promise.reject();
        }

        req.moderador = moderador;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

module.exports = { verifyModerador };