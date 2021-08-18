const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../Module/User')


//get all users
router.get('/', (req,res) => {
    User.findAll()
    .then(user => {
        
        res.sendStatus(200)
    })
    .catch(err => console.log(err))
    
})


// add user
router.get('/add',(req,res) => {
    const data = {
        name: "Hamzeh obeidat",
        password: "123456",
        email: "hamzeh@gmail.com",
        role: "admin"
    }

    let {name, password,email, role} = data

    // insert into table

    User.create({
        name,
        password,
        email,
        role
    })
    .then(user => res.redirect('/user'))
    .catch(err => console.log(err))
})

module.exports = router