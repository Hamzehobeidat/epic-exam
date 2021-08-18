const dotenv = require('dotenv')
const { Sequelize } = require('sequelize');

dotenv.config({path: './.env'})

module.exports  = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, '', {
    host: 'localhost',
    dialect: 'mysql' 
  });