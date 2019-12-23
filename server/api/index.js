let router = require('express').Router()
let origin = require('../data')

let data = { ...origin }

const { getBalance, normalize } = require('../utils')

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body)
  }, timeout)

const withCategory = (data, list) => {
  console.log(data[list], list);

  const items = normalize(data[list].committed)
  const categories = data.categories[list]
  const accounts = data.accounts

  return  items.map(item => {
    item.category = { id: item.category, ...categories[item.category] }
    item.account = { id: item.account, ...accounts[item.account] }
    return item
  })
}

const addItem = (item, type) => {
  try {
    const id = Date.now()
    data[type].committed[id] = item
    return { status: 'ok', [type]: withCategory(data, type) }
  } catch(err) {
    return { status: 'error', message: err }
  }
}

const deleteItem = (id, type) => {
  if(!data[type].committed[id]) return { status: 'error', message: 'Запись не найдена' }
  delete data[type].committed[id]
  return { status: 'ok', [type]: withCategory(data, type) }
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
  reply(res, withCategory(data, 'costs'))
})

router.post('/costs/add', (req, res) => {
  const data = addItem(req.body, 'costs')
  reply(res, data)
})

router.post('/costs/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'costs')
  reply(res, data)
})



router.get('/incomes/committed', (req, res, next) => {
  reply(res, withCategory(data, 'incomes'))
})

router.post('/incomes/add', (req, res) => {
  const data = addItem(req.body, 'incomes')
  reply(res, data)
})

router.post('/incomes/delete/', (req, res) => {
  const data = deleteItem(req.body.id, 'incomes')
  reply(res, data)
})

module.exports = router
