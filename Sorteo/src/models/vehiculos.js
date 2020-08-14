const mongoose = require('mongoose')
const validator = require('validator')

const Vehiculo = mongoose.model('Vehiculos', {
    propietario_id: {
        type: String,
        required: true,
        trim: true
    },

    propietario_name: {
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

// const carro= new Vehiculo({
//         propietario: "Fidel",
//         marca: "Freedom",
//         modelo: "Vespa",
//         year: "2019"
//     })
//     carro.save().then(
//         console.log('Agregado')
//     ).catch(
//         console.log('No paso nada')
//     )
    

module.exports = Vehiculo