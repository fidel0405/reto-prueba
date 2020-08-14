const mongoose = require('mongoose')
const validator = require('validator')
const e = require('express')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

const getAllUsers = async () => {
    const users = await User.find()
    const count = await User.countDocuments()
    return console.log(count), console.log(users)
}

const getUserLogin= async(body)=> {
    const count= await User.countDocuments(body)
    return count
}

// const user= new User({
//     name: "admin",
//     password: "Felizcumpleano"
// })
// user.save().then(
//     console.log('Agregado')
// ).catch(
//     console.log('No agregado')
// )


//const nombre= 'admin'
//const pass= 'superadmin'

// getUserLogin(nombre,pass).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })



//Usuario de ingreso predeterminado

// const user= new User({
//     name: "admin",
//     password: "Felizcumpleano"
// })

// const userLog= User.find({ name: 'admin' }).getQuery

// const userLog= User.findOne({
//     "name": user.name,
//     "password": user.password
// }
// ).getQuery()

// if(user.name.value==userLog.name.value && user.password.value==userLog.password.value){
//     console.log('Ya existe')
// }else{
//     console.log('No exite, lo guardare')
//     user.save()
// }

// console.log(user.name)
// console.log(userLog.name)
// console.log(user.password)
// console.log(userLog.password)

module.exports = {User, 
                getUserLogin}