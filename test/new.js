const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server')
const dbHelper = require('./helpers/db')

chai.use(chaiHttp)

describe('/new', () => {

  beforeEach(() => {
    return dbHelper.initDb()
  })

  it('should contain h1 element', (done) => {
    chai.request(server)
      .get('/contacts/new')
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<h1>New Contact</h1>')
        done(error)
      })
  })
  it('should contain span element with First name', (done) => {
    chai.request(server)
      .get('/contacts/new')
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<span>First name:</span>')
        done(error)
      })
  })
  it('should contain span element with Last name', (done) => {
    chai.request(server)
      .get('/contacts/new')
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<span>Last name:</span>')
        done(error)
      })
  })
})
