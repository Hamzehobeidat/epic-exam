const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize');
const { authUser, authRole } = require('./Auth/basicAuth')
const User = require('./Module/User')
const dotenv = require('dotenv')
const app = express();
app.use(express.json())

//database
const db= require('./config/database')


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


// admin page
app.get('/admin',  authRole('admin'),(req, res) => {
    // res.send('Admin Page')
})


// exam page
app.get('/exam', authUser, (req, res) => {
    // res.send('exam page')
})

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password


  // const user  = User.findAll({
  //   attributes: [
  //     'email', 'password'
  //   ]
  // });
  // console.log(user);

  const user  = User.findAll({
    where: {
      email: email,
      password: password
      
    }
  }).then((result) => {
    if (result.length > 0) {
      res.send(result)
    }else {
          res.send({message: "wrong user"})
        }
  });
  // console.log(user);
  // db.query(`SELECT * FROM user WHERE email = ${email} AND password = ${password}`,
  // [email,password], (err, result) => {
  //   console.log(result);
  //   if (err) {
  //     res.send({err:err})
  //   }

  //   if (result.length > 0) {
  //     res.send(result)
  //   }else {
  //     res.send({message: "wrong user"})
  //   }
  // }
  // )
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started on port 3000');
})