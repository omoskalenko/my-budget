const fs = require('fs')
const path = require('path')

let db = JSON.parse(fs.readFileSync(path.resolve('data/db.json')))

const saveToFile = (db) => fs.writeFileSync(
  path.resolve('data/db.json'),
  JSON.stringify(db, null, 4),
)

module.exports = {
  db,
  saveToFile,
}
