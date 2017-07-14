const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const database = require('../database')
const dbHelper = require('./helpers/db')

describe('database query tests', () => {

  beforeEach(() => {
    return dbHelper.initDb()
  })

  context('create and get contact', () => {
    contact = {
      first_name: 'Some',
      last_name: 'Person'
    }

    badContact = {
      break: 'things'
    }

    it('should add a contact to the database, returns id/name', (done) => {
      database.createContact(contact)
        .then((response) => {
          expect(response[0].id).to.eql(4)
          expect(response[0].first_name).to.equal('Some')
          expect(response[0].last_name).to.equal('Person')
        })
        .then(done, done)
    })

    it('response should have an error message if given invalid input', (done) => {
      database.createContact(badContact)
        .then((response) => {
          expect(response.name).to.eql('error')
        })
        .then(done, done)
    })

    it('should return 1 contact', (done) => {
      database.getContact(1)
        .then((response) => {
          expect(response.id).to.equal(1)
          expect(response.first_name).to.equal('Jared')
          expect(response.last_name).to.equal('Grippe')
        })
        .then(done, done)
    })

    it('should return all contacts', (done) => {
      database.getContacts()
        .then((response) => {
          expect(response.length).to.eql(3)
        })
        .then(done, done)
    })
  })

  context('delete contact', () => {
    it('should delete 1 contact', (done) => {
      database.deleteContact(2)
        .then(database.getContacts()
          .then((response) => {
            expect(response.length).to.eql(2)
          })
          .then(done, done))
    })
  })

  context('search for contact', () => {
    it('should find a contact', (done) => {
      const okContact = 'Jared'
      database.searchForContact(okContact)
        .then((response, error) => {
          expect(response[0].id).to.eql(1)
          expect(response[0]).to.contain({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        })
        .then(done, done)
    })

    it('returns empty array if contact not found', (done) => {
      const notFound = 'Keith'
      database.searchForContact(notFound)
        .then((response, error) => {
          expect(response).to.eql([])
        })
        .then(done, done)
    })

  })
})
