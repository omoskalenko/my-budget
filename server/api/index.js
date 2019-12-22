let router = require('express').Router()
let origin = require('../data')

let data = { ...origin }

const { getBalance, normalize } = require('../utils')

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body)
  }, timeout)

const costsWithCategory = (data) => {
  const costs = normalize(data.costs.committed)
  const categories = data.categories.costs
  const accounts = data.accounts

  return  costs.map(cost => {
    cost.category = { id: cost.category, ...categories[cost.category] }
    cost.account = { id: cost.account, ...accounts[cost.account] }
    return cost
  })
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
  reply(res, costsWithCategory(data))
})

router.post('/costs/add', (req, res) => {
   const id = Date.now()
  data.costs.committed[id] = req.body
  reply(res, { status: 'ok', cost: costsWithCategory(data) })
})

module.exports = router
