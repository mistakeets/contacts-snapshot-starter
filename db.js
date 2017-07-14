module.exports = (function() {
  var db
  const makeDbConnection = () => {
    const pgp = require('pg-promise')()
    const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
    const db = pgp(connectionString)
    db = pgp(connectionString)
  }
  makeDbConnection()
  return {
    conn: () => db,
    makeDbConnection
  }
})()
