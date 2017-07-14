const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('Testing things!', () => {
  it('should return status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        expect(response).to.have.status(200)
        done(error)
      })
  })

  it('should return html', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        expect(response).to.be.html
        done(error)

      })
  })

  it('should return status 404 for bad routes', (done) => {
    chai.request(server)
      .get('/invalidPage')
      .end((error, response) => {
        response.should.have.status(404)
        done(error)
      })
  })
})
