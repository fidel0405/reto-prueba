const mongoose = require('mongoose')
const validator = require('validator')
const User = require('../models/users')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const express = require('express')
const app= express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/users/userlogic', (req, res) => {
    User.find(
        { name: req.name },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            if(!result===null){
                res.redirect('../sorteo')
            }
          }
        }
      )
})