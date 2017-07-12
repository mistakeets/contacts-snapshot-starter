const Queryfile = require('pg-promise').QueryFile
const path = require('path')
const db = require('../../db')

function sql(file) {
  const fullPath = path.join(__dirname, file)
  return new Queryfile(fullPath)
}

const initFileConfig = {
  reset: sql('../seed/truncate.sql'),
  seed: sql('../seed/contacts.sql')
}

const resetDb = () => {
  return db.none(initFileConfig.reset)
}

const seedDb = () => {
  return db.any(initFileConfig.seed)
}

const initDb = () => {
  return resetDb()
    .then(() => seedDb())
}

module.exports = { initDb }
