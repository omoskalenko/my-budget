const router = require('express').Router()

const { db, getTransaction, } = require('../db')
const { addItem, deleteItem, commitTransaction } = require('../model')
const { getBalance, normalize, withCategory, reply } = require('../utils')

const createResponse = {
  ok: (data) => ({ status: 'ok', ...data }),
  error: (err) => ({ status: 'error', message: err })
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
