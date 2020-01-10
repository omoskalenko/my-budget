/**
* Преобразование объекта с данными по id в массив объектов с свойством id
*
* @returns {@array}
*/
function normalize(object) {
  if (!object) return []
  return Object.entries(object).map(item => ({ id: item[0], ...item[1] }))
}

/**
* Получить сумму транзакций по id счета
*
* @returns {@number} - сумма транзакций
*/
function getAmountByIdAccount(account, transactions) {
  return (normalize(transactions)
    .filter(transaction => transaction.account === +account)
    .reduce((res, transaction) => res + transaction.amount, 0))
}

  /**
  * Получить входящие зачисления на счет
  *
  * @param {number} - accountId - id счета
  * @param {object} - income - Коллекция транзакции доходов
  * @returns {number} - сумму зачислений за все время
  */
 const getIncoming = (accountId, income) => {
  // return  getAmountByIdsTransactions(accounts[accountId].transactions.income, income)
  return getAmountByIdAccount(accountId, income)
}

/**
* Получить расходы с счета
*
* @param {number} - accountId - id счета
* @param {object} - costs - Коллекция транзакции расходов
* @returns {@number} - сумму зачислений за все время
*/
const getCosts = (accountId, costs) => {
  // return getAmountByIdsTransactions(accounts[accountId].transactions.costs, costs)
  return getAmountByIdAccount(accountId, costs)
}


// Получить баланс счета по id счета
const getBalance = (accountId, income, costs) => {
  return getIncoming(accountId, income) - getCosts(accountId, costs)
}

const reply = (res, body, timeout = 1000, status = 200) => res.status(status).json(body)
  // setTimeout(() => {
  //   res.status(status).json(body)
  // }, timeout)



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

module.exports = {
  normalize,
  getBalance,
  reply,
  withCategory
}
