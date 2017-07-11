const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')

chai.use(chaiHttp)

describe('/contact', () => {
  it('should create a new contact', (done) => {
    chai.request('http://localhost:3000')
      .post('/contacts/new')
      .send({ "first_name": "Some", "last_name": "Person" })
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
        done()
      })
  })
})
