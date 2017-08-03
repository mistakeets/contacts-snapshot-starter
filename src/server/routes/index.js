const router = require('express').Router()
const auth = require('./auth')
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts')

const { isLoggedIn } = require('../middlewares')

router.use('/auth', auth)

router.get('/', isLoggedIn, (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => { response.render('index', { contacts }) })
    .catch(err => console.log('err', err))
})

router.use('/contacts', isLoggedIn, contacts)

module.exports = router
