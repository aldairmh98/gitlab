'use strict';

var _ = require('lodash');

var usersRepository = require('../repositories/users.repository');
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

function login(username, psw){
  console.log('Loggeando...')
  return usersRepository.login(username, psw);
}
function getUsers(params) {
  console.log("ENTRO al metodo service");
  return usersRepository.getUsers(params);
}

function getUserById(id) {
  return usersRepository.getUserById(id);
}

function createUser(params) {
  return usersRepository.createUser(params);
}


function deleteUser(username, password) {

  var result;

  result = usersRepository.deleteUser(username, password);
  
  return result;
}

function updateUser(params) {
  return usersRepository.updateUser(params);
}

module.exports = {
  getUsers,
  login,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
  GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID,
  GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED
}