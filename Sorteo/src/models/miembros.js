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
    }
})

// const miembro= new Miembro({
//     nombre: "Fidel",
//     foto: "Fotodeprueba"
// })
// miembro.save().then(
//     console.log('Agregado')
// ).catch(
//     console.log('No paso nada')
// )

const insertMiembro= (body)=> {
    const newMember= new Miembro(body)
    newMember.save()
}

// insertMiembro({
//     nombre: "Fidel",
//     foto: "foto"
// })



module.exports = Miembro