const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../Module/User')
const app = express();
app.use(express.json())

function authUser(req, res, next) {
  
    User.findOne({  where: { email: "hamzeh@gmail.com" } }).then((user) => {
      if (!user){
        console.log('Not found!');
        res.status(403)
        return res.send('You need to sign in')
        
      }

     })
     .catch((err) => {
      
      console.log('Something went wrong trying to authenticate');
       
     })
  
    next()
  }
  
  function authRole(role) {
    return (req, res, next) => {

        const user = User.findOne({ where: { email: "hamzeh@gmail.com" } })
          
          user.then((u) => {
            if (u.role !== role) {
          
              res.status(401)
              // return res.send('Not allowed')
              
              console.log('not allowed');
  
            }
          }).catch(err => console.log(err))
         
      
  
      next()
    }
  }
  
  module.exports = {
    authUser,
    authRole
  }