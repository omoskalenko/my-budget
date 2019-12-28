import API from "../../API"
import { Record } from "immutable"
import { take, spawn, call, put } from "redux-saga/effects"
import { createSelector } from "reselect"
import { getPeriod, getNextPeriod } from "../parameters/index"
import { committedCosts, plannedCosts } from "../costs/costs"
import { committedIncomes, plannedIncomes } from "../incomes/incomes"
import { calculatePlannedBalance, calculateActulBalance } from "../../utils/index"

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
    return calculateActulBalance(accountsSelector, committedCosts, committedIncomes)
  }
)

// export const getPlannedBalance = createSelector(
//   [accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod],
//   (accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod) => {
//     return calculatePlannedBalance(accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod)
//   })




const getAccountsWithBalance = (accounts, balance) => {
  const setBalance = (balance) => (account) => {
    const newAccount = {...account}
    newAccount.balance = balance[account.id]
    return newAccount
  }

  const newAccounts = [...accounts]
  try {
    return newAccounts.map(setBalance(balance))
  } catch(error) {
    return newAccounts
  }
  
}

export const getAccountsWithActulBalance = createSelector(
  [accountsSelector, getActulBalance],
  (accountsSelector, getActulBalance) => {
    return getAccountsWithBalance(accountsSelector, getActulBalance)
  }
)

export const getAccountsWithPlannedBalance = createSelector(
  [accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod],
  (accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod) => {

    const plannedBalance = calculatePlannedBalance(accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getPeriod)
    return getAccountsWithBalance(accountsSelector, plannedBalance)
  }
)

export const getAccountsWithPlannedBalanceNext = createSelector(
  [accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getNextPeriod],
  (accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getNextPeriod) => {
    const plannedBalance = calculatePlannedBalance(accountsSelector, getActulBalance, plannedIncomes, plannedCosts, getNextPeriod)
    return getAccountsWithBalance(accountsSelector, plannedBalance)
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
