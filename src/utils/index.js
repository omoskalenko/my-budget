import moment from 'moment'
import uuid from 'uuid/v4'
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

export const getTransactionsForPeriod = (transactions, period, type) => {
  const dateProperty = {
    committed: 'commit',
    planned: 'start'
  }
  const addDisplayDate = (transaction, dateProperty) => {
    const newTransaction = { ...transaction }
    newTransaction.displayDate = moment(transaction[dateProperty]).format('DD.MM.YYYY')
    newTransaction.key = uuid()
    return newTransaction
  }
  const copyTransactions = [...transactions]
  if (period.length < 2) return copyTransactions.map(transaction => {
    return addDisplayDate(transaction, dateProperty[type])
  })

  return copyTransactions
    .filter(transaction => {
      return moment(transaction[dateProperty[type]]).isBetween(period[0], period[1], 'day', [])
    }).map(transaction => {
      return addDisplayDate(transaction, dateProperty[type])
    })
}

export const getPlannedTransactionsForPeriod = (transactions, period) => {

  const addDisplayDate = (transaction, date) => {
    const newTransaction = { ...transaction }
    newTransaction.displayDate = date.format('DD.MM.YYYY')
    newTransaction.key = uuid()
    return newTransaction
  }

  // создаем копию коллекции транзакций для работы
  const copyTransactions = [...transactions]
  // если в периоде не определен или определено только начала - возвращаем все запланированные транзакции с текущим днем
  if (period.length < 2) return copyTransactions.map(transaction => {
    return addDisplayDate(transaction, moment())
  })

  // Получаем действующие транзакции
  const notCompletedTransaction = copyTransactions
    .filter(transaction => moment(transaction.end).isSameOrAfter(period[0]) || !transaction.end)

  // Получаем первый день периода
  const startPeriod = moment(period[0]) // необходимо скопировать

  // Массив для сбора транзакций входящих в период
  let filteredTransaction = []
  const count = period[1].diff(period[0], 'days')

  // Проходимся по всем датам периода
  for (let i = 0; i <= count; i += 1) {
    // Получаем дату и месяц дня периода
    const pDay = startPeriod.get('date')
    const pMonth = startPeriod.get('month')
    notCompletedTransaction.forEach((transaction, y) => {
      // Получаем дату и месяц стартового дня транзакции
      const tDay = moment(transaction.start).get('date')
      const tMonth = moment(transaction.start).get('month')
      // сравниваем день
      if (tDay === pDay) {

        // Если транзакция ежемесячная возвращаем транзакцию с датой дня периода для отображения
        if (transaction.periodicity === 'monthly') {
          filteredTransaction.push(addDisplayDate(transaction, startPeriod))
        }
        // Если транзакция ежедгодная сравниваем месяц и возвращаем транзакцию с датой дня периода для отображения
        if (transaction.periodicity === 'everyyear') {
          if (tMonth === pMonth) filteredTransaction.push(addDisplayDate(transaction, startPeriod))
        }
      }
      // Если транзакция ежедневная возвращаем транзакцию с датой дня периода для отображения
      if (transaction.periodicity === 'daily') {
        filteredTransaction.push(addDisplayDate(transaction, startPeriod))
      }
    })
    // берем следующую дату периода
    startPeriod.add(1, 'days')
  }
  return filteredTransaction
}

/**
 *
 * @param {object} data - {
 * type - тип
 * payload - данные для валидации
 * }
 * @param {object} schemas объект с схемами, где ключ равен типу аргумента data
 */
export const validateTransaction = (data, schemas) => {
  const { type, payload } = data
  return schemas[type].validate(payload)
}
