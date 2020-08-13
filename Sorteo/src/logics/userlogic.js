const mongoose = require('mongoose')
const validator = require('validator')
const User = require('../models/users')

const users= User.find().count


const UserLog= function(name, password){

}
