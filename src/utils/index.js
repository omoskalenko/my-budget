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
 export const getIncoming = (accountId, income) => {
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
export const getCoasts = (accountId, costs) => {
  // return getAmountByIdsTransactions(accounts[accountId].transactions.costs, costs)
  return getAmountByIdAccount(accountId, costs)
}


// Получить баланс счета по id счета
export const getBalance = (accountId, income, costs) => {
  return getIncoming(accountId, income) - getCoasts(accountId, costs)
}
