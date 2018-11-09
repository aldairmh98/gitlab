'use strict';

var _ = require('lodash');
var shortid = require('shortid');


const Sequelize = require('sequelize');

const sequelize = new 
Sequelize('postgres://aldairmh:Playtime123@35.184.107.155:5432/momingo')
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.2');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Posts = sequelize.define('posts', {
	descripcion: {
		type: Sequelize.STRING
    },
    calificacion: {
        type: Sequelize.FLOAT
    },
    username:{
        type: Sequelize.STRING
    }
  });

  function createPost(paramas) {   
    return new Promise(
      function(resolve, reject) {
      //console.log('Body %s ', paramas.username);
      //Posts.create({
      //descripcion: paramas.desc,
      //   calificacion: 0,
      //username: paramas.username
      console.log("QUE PASA");
        then(() => resolve({"Message":"Ok"}))
        .catch(error => resolve(error));
      });
    }


    function deletePost(id_post){
      return new Promise(
        function(resolve, reject) {
          Posts.destroy({where:{
            id: id_post
          }})
          .then(() => resolve(null))
          .catch(error => resolve(error));
        }
      )
    }
    
    module.exports={
        createPost,
        deletePost
    }