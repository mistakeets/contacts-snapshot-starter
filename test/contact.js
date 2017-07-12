const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')
const db = require('./helpers/db')

chai.use(chaiHttp)

describe('/contacts', () => {

  beforeEach(() => {
    return db.initDb()
  })

  it('should create a new contact', (done) => {
    chai.request('http://localhost:3000')
      .post('/contacts')
      .type('form')
      .send({ first_name: 'That', last_name: 'Person' })
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
      })
    done()
  })

  it('should delete a contact', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/2/delete')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response.text).to.not.contain('<h1>Tanner&nbsp;Welsh</h1>')
      })
    done()
  })

  it('should return a first name and last name', (done) => {
    chai.request('http://localhost:3000')
      .get('/contacts/1')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response.text).to.contain('<h1>Jared&nbsp;Grippe</h1>')
      })
    done()
  })
})
