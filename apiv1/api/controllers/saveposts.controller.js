'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var savePostService = require('../services/saveposts.service');
var utils = require('../utils/writer.js');

// Module Name
const MODULE_NAME = '[Follows Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'follow not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Unfollowed successfully';

function savePost(req, res){
    try{
        var params={username:req.body.username,
                    id:req.body.id };
        savePostService.savePost(params).then(
            function (response) {
                if(!response){
                    res.status(200);
                    res.json("ok");
                }else{
                    res.status(409).json(response);
                }
            }
        ).catch(function(response){
            console.log("error");
        })
    }catch(error){
    }
}

function deletesavedPost(req, res){
    try{
        var id_save=req.swagger.params.id_save.value;
            savePostService.deletesavedPost(id_save).then(
                function (response) {
                    if(!response){
                        res.status(200);
                        res.json("ok");
                    }else{
                        res.status(409).json(response);
                    }
                }
    )
    }catch(error){

    }
}
module.exports={
    savePost,
    deletesavedPost,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}