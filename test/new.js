const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')

chai.use(chaiHttp)

describe('/new', () => {
  it('should contain h1 element', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<h1>New Contact</h1>')
        done()
      })
  })
  it('should contain span element with First name', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<span>First name:</span>')
        done()
      })
  })
  it('should contain span element with Last name', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
        expect(response.text).to.contain('<span>Last name:</span>')
        done()
      })
  })
})