'use strict';
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = 'aldair-218814'; // Replace with your project ID

const GOOGLE_CLOUD_KEYFILE = 'ALDAIR-51118eac757c.json'; // Replace with the path to the downloaded private key
// Creates a client
const storage = new Storage({

  projectId: GOOGLE_CLOUD_PROJECT_ID,

  keyFilename: GOOGLE_CLOUD_KEYFILE,

});

var BUCKET_NAME = 'momingos';
var myBucket = storage.bucket(BUCKET_NAME);
const file = myBucket.file('pruebita1.png');

var _ = require('lodash');
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var utils = require('../utils/writer.js');
var util = require('util');
const fs = require('fs');
var postService = require('../services/post.service');
// Module Name
const MODULE_NAME = '[Post Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'POST not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'POST deleted successfully';

const getPublicThumbnailUrlForItem = file_name => {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`
}
    
    function createPost(req, res) {
      // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
      //var name = req.swagger.params.name.value || 'stranger';
      var params ={ file:req.swagger.params.file.value, body: req.swagger.params.body.value};
      var obj = JSON.parse(params.body);
      console.log(obj.username);
      var stream = file.createWriteStream({
        public: true,
        metadata:{
          contentType: params.file.mimetype
        }
      });

      stream.on('error', (err) => {
        console.log(err)
      });
      stream.on('finish',()=>{
        console.log('Finished')
      });

      stream.end(Buffer.alloc(params.file.size,params.file.buffer, 'base64'));

      /*let bucketName=obj.username;
      storage.createBucket(bucketName)
      .then(() => {
       console.log(`Bucket ${bucketName} created.`);
      })
      .catch(err => {
      console.error('ERROR:', err);
    });*/
      var hello = util.format('Hello');
      //GCS PRUEBA
      // this sends back a JSON response which is a single string
      res.json(hello);
    }

    function deletePost(req, res){
      try{
      var params = { id_post: req.swagger.params.id_post.value };
      postService.deletePost(params.id_post).then(
        function (response) {
          if(!response){
              res.status(200);
              res.json("ok");
          }else{
              res.status(409).json(response);
          }
      }
      )}
      catch(error){
      }
    }


    module.exports = {
      createPost,
      deletePost,
      GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
      GS_CT_DELETED_SUCCESSFULLY,
      MODULE_NAME
    }    