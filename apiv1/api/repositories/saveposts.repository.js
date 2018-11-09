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

  const PostSaves = sequelize.define('usuariofavs', {
	id: {
    type: Sequelize.INTEGER,
    primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    post:{
        type: Sequelize.INTEGER
    }
  });

  function savePost(params){
    return new Promise(
        function(resolve, reject) { 
      PostSaves
      .create({
          username: params.username,
          post: params.id
      }, { fields: ['username', 'post'] })
      .then(() => resolve(null))
      .catch(error => resolve(error));
  }
  )
};

function deletesavedPost(id_save){
  return new Promise(
    function(resolve, reject) {
      PostSaves.destroy({
        where:{id:id_save}
      })
     .then(()=>resolve(null))
     .catch(error => resolve(error));
    }
  )
}

  module.exports={
    savePost,
    deletesavedPost
}