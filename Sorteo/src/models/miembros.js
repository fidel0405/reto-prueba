const mongoose = require('mongoose')
const validator = require('validator')

const Miembro = mongoose.model('Miembros', {
    nombre: {
        type: String,
        required: true,
        trim: true
    },

    foto: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    }
})

module.exports = Miembro