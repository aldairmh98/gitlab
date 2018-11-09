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

  const Users = sequelize.define('usuarios', {
	username: {
		type: Sequelize.STRING
	},
	descripcion: {
		type: Sequelize.STRING
    },
    ranking: {
        type: Sequelize.INTEGER
    },
    passw:{
        type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    }
  });


  function login(username, psw){
    return new Promise(function(resolve, reject) {
      Users.findOne({where: {username:username, passw:psw}}).then(users => {
        console.log(users);
        resolve(users);
      })
    })
  }
function getUsers(params) {
    console.log("ENTRO al metodo repo");
    return new Promise(function(resolve, reject) {
        Users.findAll().then(Users => {
            resolve(Users);
       })
      });
}

function getUserById(id) {
    return new Promise(function(resolve, reject) {
      Users.findById(id).then(users => {
        console.log(users);
        resolve(users);
      })
    })
  }
  
  
  function createUser(body) {
  
    console.log('Body %s ', body.username);
    
    return new Promise(
      function(resolve, reject) { 
      console.log('Body %s ', body.username);
      Users
       .create({ 
                 username: body.username, 
                 email: body.email, 
                 descripcion: body.descripcion,
                 passw: body.passw,
                 ranking: 0,
              })
              .then(myoperador => resolve(myoperador))
              .catch(error => resolve(error));
      });
  
  }
  
  
  function deleteUser(username, password) {
  
    var idToSearch = username;
  
    return new Promise(function(resolve, reject) {
      
    Users
      .findOne({where: {username:username, passw: password }})
      .then(myuser => {
        console.log("Result of findById: " + myuser);
        if (!myuser) {
          resolve({});
        }
        return myuser
          .destroy()
          .then(() => resolve(myuser))
          .catch(error => resolve(error));
      })
      .catch(error => {
        console.log("There was an error: " + error);
        resolve(error);
      });
  
    });
  }

  function updateUser(body) {
    return new Promise(
      function(resolve, reject) {
      Users
        .findOne({where: {username:body.id}})
        .then(myoper => {
          console.log("Result of findById: " + myoper);
          if (!myoper) {
            resolve({});
          }
          return myoper
            .update({ 
                username: body.username, 
                email: body.email,
                descripcion: body.descripcion,
                passw: body.passw
            })
            .then(() => resolve(myoper))
            .catch(error => resolve(error));
        })
        .catch(error => {
          console.log("There was an error: " + error);
          resolve(error);
        });
    });
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
  }