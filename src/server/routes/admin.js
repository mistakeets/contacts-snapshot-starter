const router = require('express').Router()
const DbContacts = require('../../db/contacts')
const { renderError } = require('../utils')

router.get('/new', (request, response) => {
  if (response.locals.isAdmin) {
    response.render('new')
  } else {
    response.status('403').render('errors/not_auth')
  }
})

router.post('/', (request, response, next) => {
  if (response.locals.isAdmin) {
    DbContacts.createContact(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`)
        next()
      })
      .catch(error => renderError(error, response, response))
  } else {
    response.status('403').render('errors/not_auth')
  }
})

router.get('/:contactId/delete', (request, response, next) => {
  const contactId = request.params.contactId
  if (response.locals.isAdmin) {
    DbContacts.deleteContact(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
      .catch(error => renderError(error, response, response))
  } else {
    response.status('403').render('errors/not_auth')
  }
})

module.exports = router
