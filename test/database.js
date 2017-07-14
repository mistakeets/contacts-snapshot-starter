const chai = require('chai')
const expect = chai.expect
const should = chai.should()
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

    badContact = {
      break: 'things'
    }

    it('should add a contact to the database, returns id/name', () => {
      database.createContact(contact)
        .then((response, error) => {
          expect(response[0].id).to.eql(4)
          expect(response[0].first_name).to.equal('Some')
          expect(response[0].last_name).to.equal('Person')
        })
        .catch(error => error)
    })

    it('response should have an error message if given invalid input', () => {
      database.createContact(badContact)
        .then((response, error) => {
          response.should.have.property('error')
        })
        .catch(error => error)
    })

    it('should return 1 contact', () => {
      database.getContact(1)
        .then((response, error) => {
          expect(response.id).to.equal(1)
          expect(response.first_name).to.equal('Jared')
          expect(response.last_name).to.equal('Grippe')
        })
        .catch(error => error)
    })

    it('should return all contacts', () => {
      database.getContacts()
        .then((response, error) => {
          expect(response.length).to.eql(3)
        })
        .catch(error => error)
    })
  })

  context('delete contact', () => {
    it('should delete 1 contact', () => {
      database.deleteContact(2)
        .then(database.getContacts())
        .then((response, error) => {
          expect(response.length).to.eql(2)
        })
        .catch(error => error)
    })
  })

  context('search for contact', () => {
    it('should find a contact', () => {
      const okContact = 'Jared'
      database.searchForContact(okContact)
        .then((response, error) => {
          expect(response[0].id).to.eql(1)
          expect(response[0]).to.contain({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        })
        .catch(error => error)
    })

    it('returns empty array if contact not found', () => {
      const notFound = 'Keith'
      database.searchForContact(notFound)
        .then((response, error) => {
          expect(response).to.eql([])
        })
        .catch(error => error)
    })

  })
})
