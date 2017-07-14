const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')
const dbHelper = require('./helpers/db')
const makeDbConnection = require('../db').makeDbConnection

chai.use(chaiHttp)

describe('/contacts', () => {

  beforeEach(() => {
    return dbHelper.initDb()
  })

  it('should create a new contact and return status code 200', (done) => {
    chai.request('http://localhost:3000')
      .post('/contacts')
      .type('form')
      .send({ first_name: 'That', last_name: 'Person' })
      .end((error, response) => {
        expect(response).to.have.status(200)
        done(error)
      })
  })

  it('response should error have if sent bogus information', (done) => {
    chai.request('http://localhost:3000')
      .post('/contacts')
      .type('form')
      .send({ sport: 'Baseball', drink: 'Beer' })
      .end((error, response) => {
        response.should.have.property('error')
        done(error)
      })
  })

  it('should delete a contact', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/2/delete')
      .end((error, response) => {
        expect(response.text).to.not.contain('<h1>Tanner&nbsp;Welsh</h1>')
        done(error)
      })
  })

  it('should return a first name and last name', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/1')
      .end((error, response) => {
        expect(response.text).to.contain('<h1>Jared&nbsp;Grippe</h1>')
        done(error)
      })
  })
})
