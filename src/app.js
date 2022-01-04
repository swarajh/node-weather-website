const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const path = require('path')
const express = require('express')
const app = express()
const port =process.env.PORT || 3000
const hbs = require('hbs')
const { error } = require('console')
const { response } = require('express')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebar engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Swaraj'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Swaraj'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Swaraj'

    }
    )
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        weather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                weather: weatherData,
                location,
                address: req.query.address
            })
        })
    })
}) 

    

   


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []

    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Swaraj',
        errorMessage: 'Help article not found'
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Swaraj',
        errorMessage: 'Page not found'
    })

})
app.listen(port, () => {
    console.log('Server is up on port ' +port)

})



