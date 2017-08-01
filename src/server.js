require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/db')
const app = express()
const { renderError } = require('./server/utils')
const morgan = require('morgan')
const config = require('../config/index.js')
const routes = require('./routes')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use(morgan('dev'))

app.get('/', routes)

app.use((request, response) => {
  response.status(404)
  response.render('not_found')
})

const port = config.port
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

module.exports = app
