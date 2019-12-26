import API from '../../API'
import { Record } from 'immutable'
import { take, spawn, call, put, select } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { committedCosts, getPlannedCostsForCalcBalance } from '../costs/costs'
import { committedIncomes, getPlannedIncomesForCalcBalance } from '../incomes/incomes'
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
export const CALC_PLANNED_BALANCE = `${moduleName}/CALC_PLANNED_BALANCE`
export const SET_PANNED_BALANCE = `${moduleName}/SET_PANNED_BALANCE`
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
        isFetching: false
      }
    }

    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const accounts = createSelector(stateSelector, state => state.list)

export const balance = createSelector(stateSelector, state => state.list)

export const getAccountsWhithActulBalance = createSelector(
  [accounts],
  accounts => accounts
)

export const getPlannedBalance = createSelector(
  [getAccountsWhithActulBalance],
  balance => balance
)



/** Actions Creators */

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS_REQUEST })
export const fetchCosts = () =>  ({ type: FETCH_COSTS_REQUEST })
export const calcPlannedBalance = () => ({ type: CALC_PLANNED_BALANCE })

/** Sagas */

export const fetchAccountsSaga = function* () {
  while(yield take(FETCH_ACCOUNTS_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchAccounts])

      yield put({
        type: FETCH_ACCOUNTS_SUCCESS,
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
    const balance = yield select(state => getAccountsWhithActulBalance(state))
    const selectCosts = yield select(state => committedCosts(state))
    const selectIncomes = yield select(state => committedIncomes(state))

    const payload = balance.map(account => {
      account.balance = getBalance(account.id, selectIncomes, selectCosts)
      return account
    })

    yield put({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload
    })

  }
}

export const calcPlannedBalanceSaga = function* () {
  while(true) {
    yield take(CALC_PLANNED_BALANCE)
    const actulBalance = yield select(state => getAccountsWhithActulBalance(state))
    const selectCosts = yield select(state => getPlannedCostsForCalcBalance(state))
    const selectIncomes = yield select(state => getPlannedIncomesForCalcBalance(state))

    const payload = actulBalance.map(account => {
      account.balance = account.balance + getBalance(account.id, selectIncomes, selectCosts)
      return account
    })

    yield put({
      type: FETCH_ACCOUNTS_SUCCESS,
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
  yield spawn(calcPlannedBalanceSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
