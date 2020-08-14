require('./db/mongoose')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require('./models/users')
const Miembro = require('./models/miembros')
const Vehiculo = require('./models/vehiculos')
const Ganadores = require('./models/ganadores')
const UserLogin= require('./models/users')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const { getUserLogin } = require('./models/users')

//Directorios
const app= express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Configuraciones 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirectoryPath))

//Metodos

//Usuarios

app.get('', (req, res) => {
    res.render('index')
})
app.post('/users', (req, res) => {

    getUserLogin(req.body).then((count) => {
        if (count===1){
            res.render('home')
        } else{
            res.render('index')
        }
    }).catch((e) => {
        console.log(e)
    })
})
            
app.get('/users', (req, res) => {
    res.render('index')
})

//Miembros

app.get('/miembros', async (req, res) => {
    try {
        const miembros = await Miembro.find({})
        res.render('miembros',{miembros})
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/miembros', async (req, res) => {
    const miembro = new Miembro(req.body)

    try {
        await miembro.save()
        res.redirect('/miembros')
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/updateMiembro/:id', async (req, res) => {
    try {
        const miembro = await Miembro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!miembro) {
            return res.status(404).send()
        }

        res.redirect('/miembros')

    } catch (e) {
        res.status(400).send(e)
    } 
})

app.get('/updateMiembro/:id', async (req, res) => {
    
    try {
        const id= req.params.id
        const miembro= await Miembro.findById(id)

        res.render('updateMiembro', {miembro})

    } catch (e) {
        res.status(500).send()
    } 
})

app.get('/deleteMiembro/:id', async (req, res) => {
    try {
        const miembro = await Miembro.findByIdAndDelete(req.params.id)

        if (!miembro) {
            res.status(404).send()
        }else{
            res.redirect('/miembros')
        }

    } catch (e) {
        res.status(500).send()
    }
})

//Vehiculos
app.get('/vehiculos', async (req, res) => {
    try {
        const miembros = await Miembro.find({})
        const vehiculos= await Vehiculo.find({})
        res.render('miembros',{miembros, vehiculos})
    } catch (e) {
        res.status(500).send()
    }
})



// app.post('/updateMiembro', async (req, res) => {
//     try {
//         const id= req.params.id
//         const miembro = await Miembro.findById(id)
//         res.render('updateMiembro',{miembro})
//     } catch (e) {
//         res.status(500).send()
//     }
// })

//Puerto

app.get('/vehiculos', (req, res) => {
    res.render('vehiculos')
})

app.get('/ganadores', (req, res) => {
    res.render('ganadores')
})

app.get('/nuevoSorteo', (req, res) => {
    res.render('nuevoSorteo')
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
