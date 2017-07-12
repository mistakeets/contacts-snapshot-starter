const chai = require('chai')
const expect = chai.expect
const database = require('../database')
const db = require('./helpers/db')

describe('database query tests', () => {

  beforeEach(() => {
    return db.initDb()
  })

  context('create contact', () => {
    contact = {
      first_name: 'Some',
      last_name: 'Person'
    }

    it('should add a contact to the database, returns id/name', (done) => {
      database.createContact(contact)
        .then((response, error) => {
          expect(response[0].id).to.equal(4)
          expect(response[0].first_name).to.equal('Some')
          expect(response[0].last_name).to.equal('Person')
        })
      done()
    })

  })
})
