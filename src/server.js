require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('./config/auth')
const session = require('express-session')
const morgan = require('morgan')
const routes = require('./server/routes')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.message = ''
  response.locals.success = null
  response.locals.isAdmin = false
  next()
})

app.use('/', routes)

app.use((request, response) => {
  response.status(404).render('errors/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
