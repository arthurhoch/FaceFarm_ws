var { Agricultor } = require('./../models/agricultor');

var verifyAgricultor = (req, res, next) => {
    var token = req.header('x-auth');

    Agricultor.findByToken(token).then((agricultor) => {
        if (!agricultor) {
            return Promise.reject();
        }

        req.agricultor = agricultor;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

module.exports = { verifyAgricultor };