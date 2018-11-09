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

  const RATEPOST = sequelize.define('usuariofavs', {
    plantilla: {
        type: Sequelize.INTEGER
    },
    username:{
        type: Sequelize.STRING
    },
    calificacion:{
        type: Sequelize.INTEGER
    }
  });

  function ratePost(params){
    return new Promise(
        function(resolve, reject) { 
      RATEPOST
      .findOne({where:{username:params.username, plantilla:params.post}})
      .then( rate => {
          if(!rate){
              RATEPOST.create({
                  plantilla: params.post,
                  username: params.username,
                  calificacion: params.calificacion
              }).then(()=>resolve(null))
              .catch(error => resolve(error));
          }else{
              rate
              .update({
                username: params.username,
                plantilla: params.post,
                calificacion: params.calificacion
              }).then(() => resolve(null))
              .catch(error=> resolve(error));
          }
      })
      .catch(error => resolve(error));
    });
}

function deleteRate(id_rate){
    return new Promise(
        function(resolve, reject){
            RATEPOST.destroy({
                where:{
                    id: id_rate
                }
            }).then(() => resolve(null))
            .catch(error => resolve(error));
        }
    );
}

module.exports={
    ratePost,
    deleteRate
}