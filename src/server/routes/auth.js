const router = require('express').Router()
const User = require('../../models/users')
const passport = require('../../config/auth')

router.get('/signup', (request, response) => {
  response.render('signup')
})

router.post('/signup', (request, response, next) => {
  const { name, email, password, passwordConfirm } = request.body
  if (password === passwordConfirm) {
    User.createUser(request.body.name, request.body.email, request.body.password)
      .then(function(contact) {
        if (contact)
          return response.render('login', {
            message: `Welcome to Contact App ${request.body.name}! Please login.`,
            success: true
          })
        next()
      })
      .catch(error => renderError(error, response, response))
  } else {
    response.render('signup', {
      message: 'Passwords do not match.',
      success: false
    })
  }
})

router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', function(request, response, next) {
  passport.authenticate('local', function(error, user, info) {
    if (error) { return next(error) }
    if (!user) {
      return response.render('login', {
        message: 'E-mail or Password does not exist',
        success: false
      })
    }
    request.logIn(user, function(error) {
      if (error) { return next(error) }
      return response.redirect('/')
    })
  })(request, response, next)
})

router.get('/logout', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/auth/login')
  })
})

module.exports = router
