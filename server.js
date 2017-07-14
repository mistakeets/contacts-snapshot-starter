const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()
const { renderError } = require('./server/utils')
const contacts = require('./server/routes/contacts')
const morgan = require('morgan')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use(morgan('combined'))

app.get('/', (request, response) => {
  const contacts = database.getContacts()
    .then((contacts) => { response.render('index', { contacts }) })
    .catch(err => console.log('err', err))
})

app.use('/contacts', contacts)

app.use((request, response) => {
  response.status(404)
  response.render('not_found')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

module.exports = app
