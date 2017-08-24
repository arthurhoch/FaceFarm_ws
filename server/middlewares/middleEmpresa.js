var { Empresa } = require('./../models/empresa');

var verifyEmpresa = (req, res, next) => {
    var token = req.header('x-auth');

    Empresa.findByToken(token).then((empresa) => {
        if (!empresa) {
            return Promise.reject();
        }

        req.empresa = empresa;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

module.exports = { verifyEmpresa };