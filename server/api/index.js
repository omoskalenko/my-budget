var router = require('express').Router()
var data = require('../data')
const { getBalance, normalize } = require('../utils')

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body)
  }, timeout)

router.get('/accounts', function(req, res, next) {
  
  const incomes = data.incomes.perfect
  const costs = data.costs.perfect
  const accounts = normalize(data.accounts)
    .map(account => {
      account.balance = getBalance(account.id, incomes, costs)
      console.log('getBalance(account.id, incomes, costs)', getBalance(account.id, incomes, costs))
      return account
    })
  reply(res, accounts)
})

module.exports = router
