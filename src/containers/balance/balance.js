import API from "../../API"
import { Record } from "immutable"
import { take, spawn, call, put } from "redux-saga/effects"
import { createSelector } from "reselect"
import { getPeriod } from "../parameters/index"
import { committedCosts, plannedCosts } from "../costs/costs"
import { committedIncomes, plannedIncomes } from "../incomes/incomes"
import { getBalance, getPlannedTransactionsForPeriod } from "../../utils/index"
import moment from "moment"

/** Constants */

export const moduleName = "balance"

/** Actions */

export const FETCH_ACCOUNTS_REQUEST = `${moduleName}/FETCH_ACCOUNTS_REQUEST`
export const FETCH_ACCOUNTS_SUCCESS = `${moduleName}/FETCH_ACCOUNTS_SUCCESS`
export const FETCH_ACCOUNTS_ERROR = `${moduleName}/FETCH_ACCOUNTS_ERROR`
export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`

/** Initial State */

const initialState = Record({
  list: [],
  actulBalance: [],
  plannedBalance: [],
  isFetching: false,
  error: false
})

/** Reducer */

export const reducer = (state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ACCOUNTS_REQUEST: {
      return state.set('isFetching', true)
    }
    case FETCH_ACCOUNTS_SUCCESS: {
      return state
        .set('list', payload)
        .set('isFetching', false)
    }
    case FETCH_ACCOUNTS_ERROR: {
      return state
        .set('error', true)
        .set('isFetching', false)
    }

    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const accountsSelector = createSelector(stateSelector, state => state.list)

export const balanceSelector = createSelector(stateSelector, state => state.actulBalance)

export const balancePlannedSelector = createSelector(stateSelector, state => state.plannedBalance)

export const getActulBalance = createSelector(
  [accountsSelector, committedCosts, committedIncomes],
  (accountsSelector, committedCosts, committedIncomes) => {
    const accounts = accountsSelector

    if(!accounts || accounts.length === 0) return []

    const selectCosts = committedCosts
    const selectIncomes = committedIncomes

    const payload = accounts
      .map(account => ({
        accountId: account.id,
        value: getBalance(account.id, selectIncomes, selectCosts)
      }))
      .reduce((res, balance) => {
        res[balance.accountId] = balance.value
        return res
      }, {})

    return payload
  }
)

export const getPlannedBalance = createSelector(
  [accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod],
  (accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod) => {
    const accounts = accountsSelector

      if(!accounts || accounts.length === 0) return []

      const balance = getActulBalance
      const selectCosts = plannedCosts
      const selectIncomes = plannedIncomes
      const period = getPeriod
      // Получаем плановые транзакции с настоящего дня до конечного дня выбранного в периоде, что бы получить сумму только будующих запланированных платежей
      // Если дата начала больше дата конца то вернется пустой массив, соответственно баланс счета останется реальным
      const costsForPeriod = getPlannedTransactionsForPeriod(selectCosts, [moment(), moment(period[1]).add(1, 'days')])
      const incomesForPeriod = getPlannedTransactionsForPeriod(selectIncomes, [moment(), moment(period[1]).add(1, 'days')])
      // Фильтр для отфильтровывания плановых транзакции по которым уже были совершены расходы/приходы, что бы повторно их не учитывать
      const filter = transations => transations.filter(transation => !transation.isCommit)
      // Добавляем свойство balance в счета с суммой реального остатка с планируемым
      const payload = accounts
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
  })

export const getAccountsWhithActulBalance = createSelector(
  [accountsSelector, getActulBalance],
  (accountsSelector, getActulBalance) => {
    try {
      return accountsSelector.map(account => {
        account.balance = balanceSelector && getActulBalance[account.id]
        return account
      })
    } catch(error) {
      return accountsSelector
    }
  }
)


export const getAccountsWhithPlannedBalance = createSelector(
  [accountsSelector, getPlannedBalance],
  (accountsSelector, getPlannedBalance) => {
    try {
      return accountsSelector.map(account => {
        account.balance = balancePlannedSelector && getPlannedBalance[account.id]
        return account
      })
    } catch(error) {
      return accountsSelector
    }
  }
)

/** Actions Creators */

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS_REQUEST })

/** Sagas */

export const fetchAccountsSaga = function* () {
  while (true) {
    try {
      yield take(FETCH_ACCOUNTS_REQUEST)
      const payload = yield call([API, API.fetchAccounts])
      yield put({
        type: FETCH_ACCOUNTS_SUCCESS,
        payload
      })
    } catch (error) {
      yield put({
        type: FETCH_ACCOUNTS_ERROR,
        error
      })
    }
  }
}


export const saga = function* () {
  yield spawn(fetchAccountsSaga)

}

// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
