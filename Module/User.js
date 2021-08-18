const { Sequelize, DataTypes } = require('sequelize');
const db= require('../config/database')

const User = db.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  tableName: 'user'
});


module.exports = User;
// `sequelize.define` also returns the model
User.sync();
console.log("The table for the User model was just (re)created!");
// console.log(User === sequelize.models.User); // true