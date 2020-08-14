const mongoose = require('mongoose')
const validator = require('validator')

const Ganador = mongoose.model('Ganadores', {
    ganador: {
        type: String,
        required: true,
        trim: true
    },
    foto: {
        type: String,
        required: true,
        trim: true
    },

    premios: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: Date,
        required: true,
        trim: true,
    }
})

module.exports = Ganador