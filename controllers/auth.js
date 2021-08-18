const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../config/database')
const User = require('../Module/User')

exports.register = (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
        }

        if (result.length > 0) {
            res.json({
                message: "email is already exist"
            })
        }
    })
    res.send("form submitted")
} 