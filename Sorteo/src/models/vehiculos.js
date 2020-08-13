const mongoose = require('mongoose')
const validator = require('validator')

const Vehiculo = mongoose.model('Vehiculos', {
    propietario: {
        type: String,
        required: true,
        trim: true
    },

    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value<0) {
                throw new Error('Solo años positivos')
            }
        }
    }
})

module.exports = Vehiculo