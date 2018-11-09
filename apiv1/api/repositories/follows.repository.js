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

  const User = sequelize.define('usuarios', {
	username: {
		type: Sequelize.STRING
	},
	descripcion: {
		type: Sequelize.STRING
    },
    ranking: {
        type: Sequelize.INTEGER
    },
    email:{
      type: Sequelize.STRING
    },
  });
  
const Follows = sequelize.define('seguidores', {
   username_seguido:{
     type: Sequelize.STRING
   },
   username_seguidor:{
    type: Sequelize.STRING
   }
 });

 function listFollowers(username){
    return new Promise (
        function(resolve, reject){        
        Follows.find({where:{username_seguido:username}
        , attributes: ['username_seguido', 'username_seguidor']})
        .then(list => {
            resolve(list);
        });
    }
    );
 }

 function deleteFollow(params){
   return new Promise(
     function(resolve, reject) {
       Follows.destroy({
         where:{username_seguidor:params.username_seguidor, username_seguido:params.username_seguido}
       })
      .then(()=>resolve(null))
      .catch(error => resolve(error));
     }
   )
 }
 function followUser(params){
    console.log(params.follower);
    console.log(params.followed);
    return new Promise (
      function(resolve, reject) {
        Follows.create({
          username_seguidor: params.follower,
          username_seguido: params.followed
        })
        .then(()=>resolve(null))
        .catch(error => resolve(error));
      }
    )
  };

  module.exports = {
    followUser,
    listFollowers,
    deleteFollow
  }