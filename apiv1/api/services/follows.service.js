'use strict';

var _ = require('lodash');

var usersRepository = require('../repositories/follows.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create gamesystem. There is a gamesystem with the same name in the system';
const GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to update gamesystem. There is a gamesystem with the same name to update in the system';
const GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID = 'Not possible to update gamesystem. There is NOT a gamesystem with the same id to update'
const GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID = 'Not possible to delete gamesystem. Gamesystem not found';
const GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED = 'Not possible to delete gamesystem. There are videogames associated with the gamesystem';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function followUser(params){
    return usersRepository.followUser(params);
  }
function listFollowers(username){
    return usersRepository.listFollowers(username);
}

function deleteFollow(params){
  return usersRepository.deleteFollow(params);
}
  module.exports = {
    followUser,
    deleteFollow,
    listFollowers,
    GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
    GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
    GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID,
    GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID,
    GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED
  }