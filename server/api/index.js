let router = require('express').Router()
let origin = require('../data/db.json')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const moment = require('moment')


let db = JSON.parse(fs.readFileSync(path.resolve('data/db.json')))

const { getBalance, normalize } = require('../utils')

const reply = (res, body, timeout = 1000, status = 200) => res.status(status).json(body)
  // setTimeout(() => {
  //   res.status(status).json(body)
  // }, timeout)

const saveToFile = (db) => fs.writeFileSync(
  path.resolve('data/db.json'),
  JSON.stringify(db, null, 4),
)

const withCategory = (data, type, subType) => {
  const items = normalize(data[type][subType])
  const categories = data.categories[type]
  const accounts = data.accounts

  return  items.map(item => {
    item.category = { id: item.category, ...categories[item.category] }
    item.account = { id: item.account, ...accounts[item.account] }
    return item
  })
}

const createResponse = {
  ok: (data) => ({ status: 'ok', ...data }),
  error: (err) => ({ status: 'error', message: err })
}

const addItem = (item, type, subType) => {
  try {
    // let i = 0
    // while(i < 50) {
    //   const id = uuid()
    //   db[type][subType][id] = item
    //   i++
    // }
    const id = uuid()
    db[type][subType][id] = item
    saveToFile(db)
    return { status: 'ok', [type]: withCategory(db, type, subType) }
  } catch(err) {
    return { status: 'error', message: err }
  }
}

const deleteItem = (id, type, subType) => {
  const transaction = db[type][subType][id]
  if(!transaction) return { status: 'error', message: 'Запись не найдена' }
  const refSubType = (subType === 'committed') ? 'planned' : 'committed'
  const refId = db[type][subType][id].ref
  if(refId) {
    const plannedTransaction = db[type][refSubType][refId]
    plannedTransaction.committed = plannedTransaction.committed.filter(commit => commit !== moment(transaction.commit).format('DD.MM.YYYY'))
  }
  
  delete db[type][subType][id]
  saveToFile(db)
  return { status: 'ok', [type]: withCategory(db, type, subType) }
}

const commitTransaction = (id, target, date) => {
  const transaction = db[target].planned[id]
  if(!transaction.committed.includes(date)) {
    transaction.committed.push(date)
    saveToFile(db)
  }
}

router.get('/directories', (req, res, next) => {
  const categories = {
    costs: normalize(db.categories.costs),
    incomes: normalize(db.categories.incomes)
  }
  const members = normalize(db.members)

  reply(res, { categories, members })
})

router.get('/accounts', (req, res, next) => {
  const incomes = db.incomes.committed
  const costs = db.costs.committed

  const accounts = normalize(db.accounts)
    .map(account => {
      account.balance = getBalance(account.id, incomes, costs)
      return account
    })
  reply(res, accounts)
})


router.get('/costs/committed', (req, res, next) => {
  reply(res, withCategory(db, 'costs', 'committed'))
})

router.post('/costs/committed/add', (req, res) => {
    const data = addItem(req.body, 'costs', 'committed')

    reply(res, data)
})

router.post('/costs/committed/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'costs', 'committed')
  reply(res, data)
})


router.get('/costs/planned', (req, res, next) => {
  reply(res, withCategory(db, 'costs', 'planned'))
})

router.post('/costs/planned/add', (req, res) => {
  const data = addItem(req.body, 'costs', 'planned')
  reply(res, data)
})

router.post('/costs/planned/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'costs', 'planned')
  reply(res, data)
})

router.get('/incomes/committed', (req, res, next) => {
  reply(res, withCategory(db, 'incomes', 'committed'))
})

router.post('/incomes/committed/add', (req, res) => {
  const data = addItem(req.body, 'incomes', 'committed')
  reply(res, data)
})

router.post('/incomes/committed/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'incomes', 'committed')
  reply(res, data)
})

router.get('/incomes/planned', (req, res, next) => {
  reply(res, withCategory(db, 'incomes', 'planned'))
})

router.post('/incomes/planned/add', (req, res) => {
  const data = addItem(req.body, 'incomes', 'planned')
  reply(res, data)
})

router.post('/incomes/planned/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'incomes', 'planned')
  reply(res, data)
})

router.post('/commit', (req, res) => {
  try {
    const { date, transaction, target } = req.body
    const id = transaction.ref
    commitTransaction(id, target.type, date)
    addItem(transaction, target.type, 'committed')
    const data = createResponse.ok({ [target.type]: withCategory(db, target.type, target.status) })
    reply(res, data)
  } catch(error) {
    const data = createResponse.error(error)
    reply(res, data)
  }
  
})

router.post('/bind', (req, res) => {
  const data = null
  reply(res, data)
})

router.post('/skip', (req, res) => {
  const data = null
  reply(res, data)
})


module.exports = router
