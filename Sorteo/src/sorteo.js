require('./db/mongoose')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require('./models/users')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')


const app= express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index')
})

app.post('/users', (req, res) => {
    const user =new User({
        name: req.body.name,
        password: req.body.password
    }
    )
    user.save()
    res.render('sorteo')
})

app.get('/users', (req, res) => {
    res.render('index')
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})