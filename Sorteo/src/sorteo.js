require('./db/mongoose')
const multer = require('multer')
const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const hbs = require('hbs')
const User = require('./models/users')
const Miembro = require('./models/miembros')
const Vehiculo = require('./models/vehiculos')
const Ganadores = require('./models/ganadores')
const UserLogin= require('./models/users')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const { getUserLogin } = require('./models/users')

const upload = multer({
    dest: 'images',
    limits: {
    fileSize: 1000000
    }
})

//Directorios
const app= express()
app.use(fileUpload())
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
     
    //const nombre = req.body.name
    //const foto = req.file
    //const foto64 = new Buffer(foto, 'binary').toString('base64');
    const miembro = new Miembro(req.body)
    miembro.save()
    const data = req.body.foto
    const base64data = Buffer.from(data).toString('base64')
    //miembro.update({foto: foto64})
    const id = miembro._id
    const nuevoMiembro = await Miembro.findByIdAndUpdate(id, {foto: base64data})

    try {
        await nuevoMiembro.save()
        console.log(nuevoMiembro)
        res.redirect('/miembros')
    } catch (e) {
        console.log('la cague')
       // res.status(400).send(e)
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
        res.render('vehiculos',{miembros, vehiculos})
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/vehiculos', async (req, res) => {

    const miembro_id= req.body.propietario_id
    const miembro= await Miembro.findById(miembro_id)

    const vehiculo = new Vehiculo({
        propietario_id: miembro_id,
        propietario_name: miembro.nombre,
        marca: req.body.marca,
        modelo: req.body.modelo,
        year: req.body.year
    })

    try {
        await vehiculo.save()
        res.redirect('/vehiculos')
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/deleteVehiculo/:id', async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id)

        if (!vehiculo) {
            res.status(404).send()
        }else{
            res.redirect('/vehiculos')
        }

    } catch (e) {
        res.status(500).send()
    }
})

app.post('/updateVehiculo/:id', async (req, res) => {

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

app.get('/updateVehiculo/:id', async (req, res) => {
    
    try {
        const id= req.params.id
        const vehiculo= await Vehiculo.findById(id)
        
        const miembros = await Miembro.find({})

        res.render('updateVehiculo', {miembros, vehiculo})

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
