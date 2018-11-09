'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var ratePostService = require('../services/ratePosts.service');
var utils = require('../utils/writer.js');

// Module Name
const MODULE_NAME = '[RatePost Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'ratepost not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'ratepost successfully';

function ratePost(req, res){
    try{
        var params = {username: req.body.username, post:req.body.post, calificacion: req.body.calificacion};
        ratePostService.ratePost(params).then({
            function (response){
                if(!respone){
                    res.status(200);
                    res.json("ok");
                }else{
                    res.status(409).json(response);
                }
            }
        }).catch(function (response) {
            utils.writeJson(res, response);
        });
    }catch(error){

    }
}

function deleteRate(req, res){
    try{

    }catch(error){

    }
}
module.exports = {
    ratePost,
    deleteRate,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
  }
