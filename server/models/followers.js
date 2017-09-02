const validator = require("validator");
const mongoose = require('mongoose');
const _ = require('lodash');

const FollowersSchema = new mongoose.Schema({
    id_usuario: mongoose.Schema.ObjectId,
    followersListAgricultor: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Agricultor'
    }],
    followersListEmpresa: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Empresa'
    }]
});

/**
 * id_usuario -> Usuario atual
 * id_seguidores -> Usuario que irá ser seguido pelo usuário atual
 */
FollowersSchema.statics.addFollower = function(id_user, id_follower, userType) {
    var Followers = this;
    
    let query = {
        _id: id_user,
        [userType]: { $ne: id_follower }
    };

    let update = { '$push' : { [userType]: id_follower } };
    
    var options = { upsert: true, new: true };
    return Followers.findOneAndUpdate(query, update, options);
};

FollowersSchema.statics.removeFollower = function(id_user, id_follower, userType) {
    var Followers = this;
    
    let query = {
        _id: id_user,
        [userType]: id_follower 
    };

    let update = { '$pull' : { [userType]: id_follower } };
    
    var options = { new: true };
    return Followers.findOneAndUpdate(query, update, options);
};

const Followers = mongoose.model(('Followers'), FollowersSchema);

module.exports = { Followers }