const chai = require('chai')
const expect = chai.expect
const database = require('../database')
const db = require('./helpers/db')

describe('database query tests', () => {

  beforeEach(() => {
    return db.initDb()
  })

  it('should add a contact to the database', (done) => {
    contact = {
      first_name: 'Some',
      last_name: 'Person'
    }

    database.createContact(contact.first_name, contact.last_name)
    console.log('do we get stuff?', database.getContacts)
    done()
  })
})
