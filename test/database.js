const chai = require('chai')
const expect = chai.expect
const database = require('../database')
const db = require('./helpers/db')

describe('database query tests', () => {

  beforeEach(() => {
    return db.initDb()
  })

  context('create and get contact', () => {
    contact = {
      first_name: 'Some',
      last_name: 'Person'
    }

    it('should add a contact to the database, returns id/name', (done) => {
      database.createContact(contact)
        .then((response, error) => {
          expect(response[0].id).to.eql(4)
          expect(response[0].first_name).to.equal('Some')
          expect(response[0].last_name).to.equal('Person')
        })
      done()
    })

    it('should return 1 contact', (done) => {
      database.getContact(1)
        .then((response, error) => {
          expect(response.id).to.equal(1)
          expect(response.first_name).to.equal('Jared')
          expect(response.last_name).to.equal('Grippe')
        })
      done()
    })

    it('should return all contacts', (done) => {
      database.getContacts()
        .then((response, error) => {
          expect(response.length).to.eql(3)
        })
      done()
    })
  })

  context('delete contact', () => {
    it('should delete 1 contact', (done) => {
      database.deleteContact(2)
        .then((response, error) => {
          if (error) { done(error) }
        })
        .then(database.getContacts()
          .then((response, error) => {
            console.log('WTF', response)
            if (error) { done(error) }
            expect(response.length).to.eql(2)
          }))
      done()
    })
  })

  context('search for contact', () => {
    it('should find a contact', (done) => {
      database.searchForContact('Jared')
        .then((response, error) => {
          if (error) { done(error) }
          console.log('what is here?', response)
          expect(response[0].id).to.eql(1)
          expect(response[0]).to.contain({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        })
      done()
    })
  })

})
