const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize');
const { authUser, authRole } = require('./Auth/basicAuth')
const dotenv = require('dotenv')
const app = express();
app.use(express.json())

//database

const db= require('./config/database')
// app.use(setUser)
// app.get('/users',userRoute)


  try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }



app.get('/', (req, res) => {
    res.send('Home Page')
})

app.use('/user', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

// admin page
app.get('/admin',  authRole('admmin'), (req, res) => {
    res.send('Admin Page')
})


// exam page
app.get('/exam', authUser, (req, res) => {
    res.send('exam page')
})

// function setUser(req, res, next) {
//     const userId = req.body.userId
//     if (userId) {
//       req.user = users.find(user => user.id === userId)
//     }
//     next()
//   }

  // Option 2: Passing parameters separately (other dialects)

// // create connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "epicexam"
// });

// // connect to mysql
// db.connect((err) => {
//     if (err) {
//         throw err
//     }
//     console.log("mysql connection");
// })



// //create database
// app.get('/createdb',(req, res) => {
//     let sql = "CREATE DATABASE epicexam";
//     db.query(sql, (err) => {
//         if (err) {
//             throw err;
//         }
//         res.send('database created')
//     })
// })

// // create table 
// app.get('/createuser', (req, res) => {
//     let sql = 'CREATE TABLE user(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))'
//     db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         res.send('user table created')
//     })
// })

// //insert user
// app.get('/employee1', (req,res) => {
//     let user = {name: 'Hamzeh Obeidat', email:'hamzeh@gmail.com',password: '123456'}
//     let sql = 'INSERT INTO user SET ?'
//     let query = db.query(sql, user, err => {
//         if (err) {
//             throw err
//         }
//         res.send('user added')
//     })
// })

// //select users
// app.get('/getuser', (req,res) => {
//     let sql = 'SELECT * FROM user'
//     let query = db.query(sql, (err, results) => {
//         if (err) {
//             throw err
//         }
//         console.log(results);
//         res.send('user details fetched')
//     })
// })


// //update user
// app.get('/updateuser/:id',(req, res) => {
//     let newPassword = "654321"
//     let sql = `UPDATE user SET password = ${newPassword} WHERE id = ${req.params.id}`
//     let query = db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         res.send('user updated')
//     }) 
// })


// // delete user
// app.get('/deleteuser/:id', (req, res)=> {
//     let sql = `DELETE FROM user WHERE id = ${req.params.id}`
//     let query = db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         res.send('user deleted')
//     })
// })



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started on port 3000');
})