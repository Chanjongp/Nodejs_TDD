const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // console.log
});

const User = sequelize.define('User', {
  name : {
    type: Sequelize.DataTypes.STRING,
    unique: true
  } // varchar 255  
});

module.exports = {sequelize: sequelize, Sequelize: Sequelize, User : User};