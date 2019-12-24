let router = require('express').Router()
let origin = require('../data')

let data = { ...origin }

const { getBalance, normalize } = require('../utils')

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body)
  }, timeout)

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

const addItem = (item, type, subType) => {
  try {
    const id = Date.now()
    data[type][subType][id] = item
    return { status: 'ok', [type]: withCategory(data, type, subType) }
  } catch(err) {
    return { status: 'error', message: err }
  }
}

const deleteItem = (id, type, subType) => {
  if(!data[type][subType][id]) return { status: 'error', message: 'Запись не найдена' }
  delete data[type][subType][id]
  return { status: 'ok', [type]: withCategory(data, type, subType) }
}

router.get('/directories', (req, res, next) => {
  const categories = {
    costs: normalize(data.categories.costs),
    incomes: normalize(data.categories.incomes)
  }
  const members = normalize(data.members)

  reply(res, { categories, members })
})

router.get('/accounts', (req, res, next) => {
  const incomes = data.incomes.committed
  const costs = data.costs.committed

  const accounts = normalize(data.accounts)
    .map(account => {
      account.balance = getBalance(account.id, incomes, costs)
      return account
    })
  reply(res, accounts)
})


router.get('/costs/committed', (req, res, next) => {
  reply(res, withCategory(data, 'costs', 'committed'))
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
  reply(res, withCategory(data, 'costs', 'planned'))
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
  reply(res, withCategory(data, 'incomes', 'committed'))
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
  reply(res, withCategory(data, 'incomes', 'planned'))
})

router.post('/incomes/planned/add', (req, res) => {
  const data = addItem(req.body, 'incomes', 'planned')
  reply(res, data)
})

router.post('/incomes/planned/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'incomes', 'planned')
  reply(res, data)
})

module.exports = router
