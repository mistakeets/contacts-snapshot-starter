const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')

chai.use(chaiHttp)


describe('Testing things!', () => {
  it('should return status code 200', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.have.status(200)
      })
    done()
  })
  it('should return html', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((error, response) => {
        if (error) {
          done(error)
        }
        expect(response).to.be.html
      })
    done()
  })
})
