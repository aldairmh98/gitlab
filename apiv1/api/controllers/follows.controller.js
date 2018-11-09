'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var userService = require('../services/follows.service');
var utils = require('../utils/writer.js');

// Module Name
const MODULE_NAME = '[Follows Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'follow not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Unfollowed successfully';


function listFollowers(req, res){
    try{
        
        var username= req.swagger.params.username.value;
        
        userService.listFollowers(username)
        .then(function (response) {
            console.log(JSON.stringify(response));
            //utils.writeJson(res, response);
            utils.writeJson(res,response);
            
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
      }catch(error){
          controllerHelper.handleErrorResponse(MODULE_NAME, listFollowers.name, error, res);
      }
}

function seguirUsuario(req, res){
    try{
      var params = {follower:req.body.followerid, followed: req.body.followedid};
      userService.followUser(params).then(
          function (response) {
          console.log("RESUELTO");
        if(!response){
          res.status(200);
          res.json("ok");
        }else{          
        res.status(409);
        utils.writeJson(res, response);
      }
      })
      .catch(function(response) {
        console.log("error");
      })
    }catch(error){
    }
  }

function deleteFollow(req, res){
    try{
        var params={username_seguidor:req.swagger.params.username_seguidor.value,
        username_seguido:req.swagger.params.username_seguido.value };
        userService.deleteFollow(params).then(
            function (response) {
                if(!response){
                    res.status(200);
                    res.json("ok");
                }else{
                    res.status(409).json(response);
                }
            }
        ).catch(function (response) {
            utils.writeJson(res, response);
        });
    }catch(error){
    }
}



  module.exports = {
    seguirUsuario,
    listFollowers,
    deleteFollow,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
  }