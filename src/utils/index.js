import moment from "moment"
import uuid from "uuid/v4"
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

  return normalizeTransactions
    .filter(transaction => String(transaction.account.id) === String(account))
    .reduce((res, transaction) => res + +transaction.amount, 0)
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

/**
 *  Получить баланс счета по id счета
 *
 * @param {number}  accountId - id счета
 * @param {{}|[]}  incomes - Коллекция транзакции доходов
 * @param {{}|[]}  costs - Коллекция транзакции расходов
 * @returns {@number} - сумму зачислений за все время
 */
export const getBalance = (accountId, incomes, costs) => {
  return getIncomingAmount(accountId, incomes) - getCoastsAmount(accountId, costs)
}

/**
 * Получить транзакции за период
 * @param {[{}]} transactions - транзакции
 * @param {[moment, moment]} period - период, массив
 * @param {String} type - тип транзакций 'committed', 'planned'(не актуально для 'planned') - не обязательный, по умолчанию 'committed'
 */
export const getTransactionsForPeriod = (transactions, period, type = "committed") => {
  const dateProperty = {
    committed: "commit",
    planned: "start"
  }
  const addDisplayDate = (transaction, dateProperty) => {
    const newTransaction = { ...transaction }
    newTransaction.displayDate = moment(transaction[dateProperty]).format("DD.MM.YYYY")
    newTransaction.key = uuid()
    return newTransaction
  }
  const copyTransactions = [...transactions]
  if (period.length < 2)
    return copyTransactions.map(transaction => {
      return addDisplayDate(transaction, dateProperty[type])
    })

  return copyTransactions
    .filter(transaction => {
      return moment(transaction[dateProperty[type]]).isBetween(period[0], period[1], "day", [])
    })
    .map(transaction => {
      return addDisplayDate(transaction, dateProperty[type])
    })
}

/**
 * Получить планоый транзакции за период, возвращает транзакции из списка плановы транзакций
 * (Плановая транзакция - транзакции только с указанием даты с которого она будет проводиться,
 * частота с которой она должна проводиться и краяняя дата, до которой транзакция будет повотряться)
 * если они запланированы в какой либо из дней в переданном периоде
 *
 * @param {[{}]} transactions
 * @param {[moment, moment]} period
 */
export const getPlannedTransactionsForPeriod = (transactions, period) => {
  // Добавляем свойства для отображения даты, существет ли в эту дату платеж по этой транзакции, ключ
  const addDetailProps = (transaction, date) => {
    const newTransaction = { ...transaction }
    newTransaction.displayDate = date.format("DD.MM.YYYY")
    newTransaction.isCommit = transaction.committed.includes(date.format("DD.MM.YYYY"))
    newTransaction.key = uuid()
    return newTransaction
  }

  // создаем копию коллекции транзакций для работы
  const copyTransactions = [...transactions]
  // если в периоде не определен или определено только начала - возвращаем все запланированные транзакции с текущим днем
  if (period.length < 2)
    return copyTransactions.map(transaction => {
      return addDetailProps(transaction, moment())
    })

  // Получаем действующие транзакции
  const notCompletedTransaction = copyTransactions.filter(transaction => moment(transaction.end).isSameOrAfter(period[0]) || !transaction.end)

  // Получаем первый день периода
  const startPeriod = moment(period[0]) // необходимо скопировать

  // Массив для сбора транзакций входящих в период
  let filteredTransaction = []
  const count = period[1].diff(period[0], "days")

  // Проходимся по всем датам периода
  for (let i = 0; i <= count; i += 1) {
    // Получаем дату и месяц дня периода
    const pDay = startPeriod.get("date")
    const pMonth = startPeriod.get("month")
    notCompletedTransaction.forEach(transaction => {
      // Получаем дату и месяц стартового дня транзакции
      const tDay = moment(transaction.start).get("date")
      const tMonth = moment(transaction.start).get("month")
      // сравниваем день
      if (transaction.periodicity === "onetime") {
        if (startPeriod.format('DD.MM.YYYY') === moment(transaction.start).format('DD.MM.YYYY')) {
          filteredTransaction.push(addDetailProps(transaction, startPeriod))
        }
      }
      if (tDay === pDay) {
        // Если транзакция ежемесячная возвращаем транзакцию с датой дня периода для отображения
        if (transaction.periodicity === "monthly") {
          filteredTransaction.push(addDetailProps(transaction, startPeriod))
        }
        // Если транзакция ежедгодная сравниваем месяц и возвращаем транзакцию с датой дня периода для отображения
        if (transaction.periodicity === "everyyear") {
          if (tMonth === pMonth) filteredTransaction.push(addDetailProps(transaction, startPeriod))
        }
      }
      // Если транзакция ежедневная возвращаем транзакцию с датой дня периода для отображения
      if (transaction.periodicity === "daily") {
        filteredTransaction.push(addDetailProps(transaction, startPeriod))
      }

      //Добавим флаг, если по данной транзакции уже совершен платеж
    })
    // берем следующую дату периода
    startPeriod.add(1, "days")
  }
  return filteredTransaction
}

export function calculateActulBalance(accounts, costs, incomes) {
  if (!accounts || accounts.length === 0) return []
  const newAccounts = [...accounts]
  const payload = newAccounts
    .map(account => ({
      accountId: account.id,
      value: getBalance(account.id, incomes, costs)
    }))
    .reduce((res, balance) => {
      res[balance.accountId] = balance.value
      return res
    }, {})

  return payload
}

export function calculatePlannedBalance(accounts, balance, incomes, costs, period) {
  if (!accounts || accounts.length === 0) return []
  const newAccounts = [...accounts]
  // Получаем плановые транзакции с настоящего дня до конечного дня выбранного в периоде, что бы получить сумму только будующих запланированных платежей
  // Если дата начала больше дата конца то вернется пустой массив, соответственно баланс счета останется реальным
  const costsForPeriod = getPlannedTransactionsForPeriod(costs, [moment(), moment(period[1])])
  const incomesForPeriod = getPlannedTransactionsForPeriod(incomes, [moment(), moment(period[1])])
  // Фильтр для отфильтровывания плановых транзакции по которым уже были совершены расходы/приходы, что бы повторно их не учитывать
  const filter = transations => transations.filter(transation => !transation.isCommit)
  // Добавляем свойство balance в счета с суммой реального остатка с планируемым
  const payload = newAccounts
    .map(account => ({
      accountId: account.id,
      // Получаем сумму планируемых остатков по счете и прибавляем текущий фактический остаток на счете
      value: getBalance(account.id, filter(incomesForPeriod), filter(costsForPeriod), account.commit) + balance[account.id]
    }))
    .reduce((res, balance) => {
      res[balance.accountId] = balance.value
      return res
    }, {})
  return payload
}

/**
 *
 * @param {{}} data - {
 * type - тип
 * payload - данные для валидации
 * }
 * @param {{}} schemas объект с схемами yup, где ключ равен типу аргумента data
 */
export const validateTransaction = (data, schemas) => {
  const { type, payload } = data
  return schemas[type].validate(payload)
}
