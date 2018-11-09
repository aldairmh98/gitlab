'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var userService = require('../services/users.service');
var utils = require('../utils/writer.js');

// Module Name
const MODULE_NAME = '[User Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'USER not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'USER deleted successfully';

    function getUserLog(req, res){
      var username = req.swagger.params.username.value;
      var psw = req.swagger.params.pass.value;
      try{
      userService.login(username, psw)
      .then(function (response) {
        console.log("Good response: " + response);
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        console.log("Bad response: " + response);
        utils.writeJson(res, response);
      });
    console.log("Success");
  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getUserById.name, error, res);
  }
      return res
    }

    function getUsers(req, res) {
      try {
        // Receiving parameters
        var params = {
          name: req.swagger.params.data.value
          };
    
        // Call to service
        userService.getUsers()
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
        });
       
      } catch (error) {
        console.log(error)
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
      }
    }

    function getUserById(req, res) {
      console.log("operadores.controller getUserById");
      try {
        console.log(req.swagger.params.id.value);
    
        operadorService.getUserById(req.swagger.params.id.value)
          .then(function (response) {
            console.log("Good response: " + response);
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            console.log("Bad response: " + response);
            utils.writeJson(res, response);
          });
        console.log("Success");
      } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getUserById.name, error, res);
      }
    }
    
    
    
    function createUser(req, res) {
      try {
        // Receiving parameters
        var params = req.body;
        userService.createUser(params)
            .then(function (response) {
                console.log("Good response: " + response);
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
        });
      } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, createUser.name, error, res);
      }
    }
    
    
    function deleteUser(req, res) {
    
      try {
        // Receiving parameters
        var params = {
          username: req.swagger.params.username.value,
          password: req.swagger.params.password.value
        };
    
          // Call to service    
        userService.deleteUser(params.username, params.password)
          .then(function (response) {
              utils.writeJson(res, response);
          })
          .catch(function (response) {
              utils.writeJson(res, response);
      });
    
      } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, deleteUser.name, error, res);
      }
    }
    
    function updateUser(req, res) {
      try {
        // Receiving parameters
        var params = req.body;
        params.id = req.swagger.params.id.value;
        console.log(params.id);
        userService.updateUser(params)
          .then(function (response) {
              utils.writeJson(res, response);
          })
          .catch(function (response) {
              utils.writeJson(res, response);
          });
      } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, deleteUser.name, error, res);
      }
    }
    
    function seguirUsuario(req, res){
      try{
        var params = {follower:req.body.followerid, followed: req.body.followedid};
        userService.followUser(params).then(function (response) {
          if(!response){
            res.status(200);
            res.json("ok");
          }else{          
          res.status(409).json(response);
        }
        })
        .catch(function(response) {
          console.log("error");
        })
      }catch(error){
      }
    }
    module.exports = {
      getUsers,
      seguirUsuario,
      createUser,
      getUserLog,
      getUserById,
      updateUser,
      deleteUser,
      GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
      GS_CT_DELETED_SUCCESSFULLY,
      MODULE_NAME
    }    