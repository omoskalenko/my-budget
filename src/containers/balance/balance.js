import API from '../../API'
import { Record } from 'immutable'
import { take, spawn, call, put, select } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { committedCosts } from '../costs/costs'
import { committedIncomes } from '../incomes/incomes'
import { getBalance } from '../../utils/index'

/** Constants */

export const moduleName = 'balance'


/** Actions */

export const FETCH_ACCOUNTS_REQUEST = `${moduleName}/FETCH_ACCOUNTS_REQUEST`
export const FETCH_ACCOUNTS_SUCCESS = `${moduleName}/FETCH_ACCOUNTS_SUCCESS`
export const FETCH_ACCOUNTS_ERROR = `${moduleName}/FETCH_ACCOUNTS_ERROR`
export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`
export const CALC_BALANCE = `${moduleName}/CALC_BALANCE`
export const SET_ACTUL_BALANCE = `${moduleName}/SET_ACTUL_BALANCE`

/** Initial State */


const initialState = Record({
  list: [],
  actulBalance: [],
  plannedBalance: [],
  isFetching: true,
  error: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false
      }
    }
    case FETCH_ACCOUNTS_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false
      }
    }
    case SET_ACTUL_BALANCE: {
      return {
        ...state,
        actulBalance: payload,
      }
    }

    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const accounts = createSelector(stateSelector, state => state.list)

export const balance = createSelector(stateSelector, state => state.actulBalance)

export const getAccountsWhithActulBalance = createSelector(
  [accounts, balance],
  (accounts, balance) => accounts.map(account => {
    account.balance = balance && balance[account.id]
    return account
  })
)

export const getPlannedBalance = createSelector(
  [getAccountsWhithActulBalance],
  balance => balance
)



/** Actions Creators */

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS_REQUEST })
export const fetchCosts = () =>  ({ type: FETCH_COSTS_REQUEST })

/** Sagas */

export const fetchAccountsSaga = function* () {
  while(yield take(FETCH_ACCOUNTS_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchAccounts])

      yield put({
        type: FETCH_ACCOUNTS_SUCCESS,
        payload
      })
      yield put({
        type: CALC_BALANCE,
        payload
      })
    } catch(error) {
      yield put({
        type: FETCH_ACCOUNTS_ERROR,
        error
      })
    }
  }
}

export const calcActulBalanceSaga = function* () {
  while(true) {
    yield take(CALC_BALANCE)
    const accounts = yield select(state => getAccountsWhithActulBalance(state))
    const selectCosts = yield select(state => committedCosts(state))
    const selectIncomes = yield select(state => committedIncomes(state))

    const payload = accounts.map(account => ({
      accountId: account.id,
      value: getBalance(account.id, selectIncomes, selectCosts)
    })).reduce((res, balance) => {
      res[balance.accountId] = balance.value
      return res
    }, {})

    yield put({
      type: SET_ACTUL_BALANCE,
      payload
    })

  }
}


export const fetchCostsSaga = function* () {
  while(true) {
    yield take(FETCH_COSTS_REQUEST)
    try {
      const payload = yield call([API, API.fetchCostsByCategory])

      yield put({
        type: FETCH_COSTS_SUCCESS,
        payload
      })
    } catch(error) {
      yield put({
        type: FETCH_COSTS_ERROR,
        error
      })
    }
  }
}

export const saga = function* () {
  yield spawn(fetchAccountsSaga)
  yield spawn(calcActulBalanceSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
