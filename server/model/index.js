const uuid = require('uuid/v4')
const moment = require('moment')

const { withCategory } = require('../utils')
const { db, saveToFile } = require('../db')

const getTransaction = (type, status) => db[type][status]

const addItem = (item, type, status) => {
  try {
    // let i = 0
    // while(i < 50) {
    //   const id = uuid()
    //   db[type][subType][id] = item
    //   i++
    // }
    const id = uuid()
    db[type][status][id] = item
    saveToFile(db)
    return { status: 'ok', [type]: withCategory(db, type, status) }
  } catch(err) {
    return { status: 'error', message: err }
  }
}

const deleteItem = (id, type, status) => {
  const transaction = db[type][status][id]
  if(!transaction) return { status: 'error', message: 'Запись не найдена' }
  const refSubType = (status === 'committed') ? 'planned' : 'committed'
  const refId = db[type][status][id].ref
  if(refId) {
    const plannedTransaction = db[type][refSubType][refId]
    plannedTransaction.committed = plannedTransaction.committed.filter(commit => commit !== moment(transaction.commit).format('DD.MM.YYYY'))
  }

  delete db[type][status][id]
  saveToFile(db)
  return { status: 'ok', [type]: withCategory(db, type, status) }
}

const commitTransaction = (id, target, date) => {
  const transaction = db[target].planned[id]
  if(!transaction.committed.includes(date)) {
    transaction.committed.push(date)
    saveToFile(db)
  }
}

module.exports = {
  commitTransaction,
  deleteItem,
  addItem
}
