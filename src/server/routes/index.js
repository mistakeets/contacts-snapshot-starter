const router = require('express').Router()
const auth = require('./auth')
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts')
const admin = require('./admin')

const { isLoggedIn, userIsAdmin } = require('../middlewares')

router.use('/auth', auth)
router.use(isLoggedIn)
router.use(userIsAdmin)
router.use('/contacts', contacts)

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => { response.render('index', { contacts }) })
    .catch(err => console.log('err', err))
})

router.use('/admin', admin)

module.exports = router
