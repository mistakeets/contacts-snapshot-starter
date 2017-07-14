const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')
const dbHelper = require('./helpers/db')

chai.use(chaiHttp)

describe('/search', () => {

  beforeEach(() => {
    return dbHelper.initDb()
  })

  it('should return status code 200', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/search?q=Jared')
      .end((error, response) => {
        expect(response).to.have.status(200)
        done(error)
      })
  })
  it('should return the correct contact', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/search?q=Jared')
      .end((error, response) => {
        expect(response.text).to.contain(
          '<input name="q" type="search" placeholder="search" value="Jared" autofocus/>')
        done(error)
      })
  })
})
