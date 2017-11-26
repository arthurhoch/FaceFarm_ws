const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');
const { Empresa } = require('../models/empresa');
const { Followers } = require('../models/followers');
const { Following } = require('../models/following');
const { ObjectID } = require('mongodb')


const searchUserByName = (req, res) => {
    const limit = parseInt(req.params.limit, 10);
    const skip = parseInt(req.params.skip, 10);
    const searchParam = req.params.searchParam;

    let searchResult = [];
    Agricultor.find({ 'nomeCompleto': { '$regex': searchParam } })
        .select('nomeCompleto _id')
        .then((agricultorList) => {
            Empresa.find({ 'nomeCompleto': { '$regex': searchParam } })
                .select('nomeCompleto _id')
                .then((empresaList) => {
                    searchResult = agricultorList.concat(empresaList);
                    return res.send({ searchResult })
                }).catch((e) => {
                    return res.status(400).send(e)
                })
        }).catch((e) => {
            return res.status(400).send(e)
        })
};

const count = (req, res) => {
    Agricultor.count({})
        .then((counter) => {
            return res.send({ counter })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const getById = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Agricultor.findById(id).then((agricultor) => {
        if (!agricultor) {
            return res.status(404).send();
        }
        return res.send({ agricultor })
    }).catch((e) => res.status(400).send(e));
};


module.exports = {
    searchUserByName,
    count,
    getById
};