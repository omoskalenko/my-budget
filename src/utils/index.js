import moment from 'moment'

/**
* Преобразование объекта с данными по id в массив объектов с свойством id
*
* @returns {@array}
*/
export function normalize(object) {
  if (!object) return []
  return Object.entries(object).map(item => ({ id: item[0], ...item[1] }))
}

/**
* Получить сумму транзакций по id счета
*
* @returns {@number} - сумма транзакций
*/
export function getAmountByIdAccount(account, transactions) {

  let normalizeTransactions = null
  normalizeTransactions = !transactions.length ? transactions : normalize(transactions)

  return (normalizeTransactions
    .filter(transaction => String(transaction.account.id) === String(account))
    .reduce((res, transaction) => res + +transaction.amount, 0))
}

  /**
  * Получить входящие зачисления на счет
  *
  * @param {number} - accountId - id счета
  * @param {object} - income - Коллекция транзакции доходов
  * @returns {number} - сумму зачислений за все время
  */
 export const getIncomingAmount = (accountId, income) => {
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
export const getCoastsAmount = (accountId, costs) => {
  // return getAmountByIdsTransactions(accounts[accountId].transactions.costs, costs)
  return getAmountByIdAccount(accountId, costs)
}


// Получить баланс счета по id счета
export const getBalance = (accountId, incomes, costs) => {
  return getIncomingAmount(accountId, incomes) - getCoastsAmount(accountId, costs)
}

export const getTransactionsForPeriod = (transactions, period) => {
  if (period.length < 2) return transactions.map(transaction => {
    transaction.displayDate = moment(transaction.committed).format('DD.MM.YYYY')
    return transaction
  })

  return transactions
  .filter(transaction => {
    return moment(transaction.committed).isBetween(period[0], period[1], 'day', [])
  }).map(transaction => {
    transaction.displayDate = moment(transaction.committed).format('DD.MM.YYYY')
    return transaction
  })
}
