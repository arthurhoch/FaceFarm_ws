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
            agricultorList = agricultorList.map((item) => {
                return {
                    _id: item._id,
                    nomeCompleto: item.nomeCompleto,
                    userType: 'agricultor'
                };
            })
            Empresa.find({ 'nomeCompleto': { '$regex': searchParam } })
                .select('nomeCompleto _id')
                .then((empresaList) => {
                    empresaList = empresaList.map((item) => {
                        return {
                            _id: item._id,
                            nomeCompleto: item.nomeCompleto,
                            userType: 'empresa'
                        };
                    })
                    searchResult = agricultorList.concat(empresaList);
                    return res.send({ searchResult })
                }).catch((e) => {
                    return res.status(400).send(e)
                })
        }).catch((e) => {
            return res.status(400).send(e)
        })
};

const getUserById = (req, res) => {
    const userId = req.params.id;

    Agricultor.findById(userId)
        .select('nomeCompleto _id')
        .then((agricultor) => {
            console.log('agricultor: ', agricultor)
            if (agricultor) {
                return res.send({ agricultor })
            } else {
                Empresa.findById(userId)
                    .select('nomeCompleto _id')
                    .then((empresa) => {
                        return res.send({ empresa })
                    }).catch((e) => {
                        return res.status(400).send(e)
                    });
            }
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

const follow = (req, res) => {
    let currentUserIdId = req.user._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Following.followUser(currentUserIdId, id_seguindo, 'followingListEmpresa').then((following) => {
                Followers.addFollower(id_seguindo, currentUserIdId, 'followersListAgricultor').then((follower) => {
                    return res.send({ cod: "SUCCESS_SEGUINDO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }), e });
            }).catch((e) => {
                if (e.codeName === 'DuplicateKey') {
                    return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" }, e)
                } else {
                    console.log(e)
                    return res.status(400).send({ cod: "ERROR_SEGUIR" }, e)
                }
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.followUser(currentUserIdId, id_seguindo, 'followingListAgricultor').then((following) => {
                    Followers.addFollower(id_seguindo, currentUserIdId, 'followersListEmpresa').then((follower) => {
                        return res.send({ cod: "SUCCESS_SEGUINDO" });
                    }).catch((e) => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }), e });
                }).catch((e) => {
                    if (e.codeName === 'DuplicateKey') {
                        return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" }, e)
                    } else {
                        console.log(e)
                        return res.status(400).send({ cod: "ERROR_SEGUIR" }, e)
                    }
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
};

const unfollow = (req, res) => {
    let currentUserIdId = req.user._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Following.unfollowUser(currentUserIdId, id_seguindo, 'followingListEmpresa').then((following) => {
                Followers.removeFollower(id_seguindo, currentUserIdId, 'followersListAgricultor').then((follower) => {
                    if (follower) {
                        return res.send({ cod: "SUCCESS_UNFOLLOW" });
                    }
                    return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW", e }) });
            }).catch((e) => {
                console.log(e)
                return res.status(400).send({ cod: "ERROR_UNFOLLOW" }, e)
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.unfollowUser(currentUserIdId, id_seguindo, 'followingListAgricultor').then((following) => {
                    Followers.removeFollower(id_seguindo, currentUserIdId, 'followersListEmpresa').then((follower) => {
                        if (follower) {
                            return res.send({ cod: "SUCCESS_UNFOLLOW" });
                        }
                        return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                    }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e }), e });
                }).catch((e) => {
                    return res.status(400).send({ cod: "ERROR_UNFOLLOW" }, e)
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
}

const getListFollowing = (req, res) => {
    let body = _.pick(req.body, ['id']);
    let id = body.id ? req.params.id : req.user._id;
    
    Following.findById(id)
        .populate('followingListAgricultor', 'nomeCompleto')
        .populate('followingListEmpresa', 'nomeCompleto')
        .exec().then((response) => {
            let listFollowing = [];
            if (response) {
                if (response.followingListAgricultor && response.followingListEmpresa) {
                    listFollowing = response.followingListAgricultor.concat(response.followingListEmpresa);
                } else if (response.followingListAgricultor) {
                    listFollowing = response.followingListAgricultor;
                } else if (response.followingListEmpresa) {
                    listFollowing = response.followingListEmpresa;
                }
            }
            return res.send({listFollowing});
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' }, e));
};

const getListFollowers = (req, res) => {
    let body = _.pick(req.body, ['id']);
    let id = body.id ? req.params.id : req.user._id;

    Followers.findById(id)
        .populate('followersListAgricultor', 'nomeCompleto')
        .populate('followersListEmpresa', 'nomeCompleto')
        .exec().then((response) => {
            let listFollowers = [];
            if (response) {
                if (response.followersListAgricultor && response.followersListEmpresa) {
                    listFollowers = response.followersListAgricultor.concat(response.followersListEmpresa);
                } else if (response.followersListAgricultor) {
                    listFollowers = response.followersListAgricultor;
                } else if (response.followersListEmpresa) {
                    listFollowers = response.followersListEmpresa;
                }
            }
            return res.send({listFollowers});
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' }, e));
};


module.exports = {
    searchUserByName,
    getUserById,
    count,
    getById,
    follow,
    unfollow,
    getListFollowers,
    getListFollowing
};