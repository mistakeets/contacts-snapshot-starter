const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/routes/contacts.js')

chai.use(chaiHttp)

describe('Testing things!', () => {
  it('should return status code 200', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((error, response) => {
        expect(response).to.have.status(200)
        done(error)
      })
  })

  it('should return html', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((error, response) => {
        expect(response).to.be.html
        done(error)

      })
  })

  it('should return status 404 for bad routes', (done) => {
    chai.request('http://localhost:3000')
      .get('/invalidPage')
      .end((error, response) => {
        response.should.have.status(404)
        done(error)
      })
  })
})
