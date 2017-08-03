const router = require('express').Router()
const DbContacts = require('../../db/contacts')
const { renderError } = require('../utils')
const { userIsAdmin } = require('../middlewares')

router.get('/new', (request, response) => {
  const user = request.user[0]
  if (userIsAdmin(user)) {
    response.render('new')
  }
  response.status('403').render('not_auth')
})

router.post('/', (request, response, next) => {
  const user = request.user[0]
  if (userIsAdmin(user)) {

    DbContacts.createContact(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`)
        next()
      })
      .catch(error => renderError(error, response, response))
  } else {
    response.status('403').render('not_auth')
  }
})

router.get('/:contactId/delete', (request, response, next) => {
  const user = request.user[0]
  const contactId = request.params.contactId
  if (userIsAdmin(user)) {

    DbContacts.deleteContact(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
      .catch(error => renderError(error, response, response))
  } else {
    response.status('403').render('not_auth')
  }
})

module.exports = router
