import API from '../../API';
import { Record } from 'immutable'
import { take, spawn, call, put, select } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { getCosts } from '../costs/costs';

/** Constants */

export const moduleName = 'accounts'


/** Actions */

export const FETCH_ACCOUNTS_REQUEST = `${moduleName}/FETCH_ACCOUNTS_REQUEST`
export const FETCH_ACCOUNTS_SUCCESS = `${moduleName}/FETCH_ACCOUNTS_SUCCESS`
export const FETCH_ACCOUNTS_ERROR = `${moduleName}/FETCH_ACCOUNTS_ERROR`
export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`
export const COMPUTED_ACCOUNTS_BALANCE = `${moduleName}/COMPUTED_ACCOUNTS_BALANCE`

/** Initial State */


const initialState = Record({
  list: [],
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

    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const accounts = createSelector(stateSelector, state => state.list)

export const getAccounts = createSelector(
  [accounts],
  accounts => accounts
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
    } catch(error) {
      yield put({
        type: FETCH_ACCOUNTS_ERROR,
        error
      })
    }
  }
}

export const computedBalanceSaga = function* () {
  while(yield take(COMPUTED_ACCOUNTS_BALANCE)) {
    const accounts = yield select(state => getAccounts(state))
    const costs = yield select(state => getCosts(state))
    
  }
}

export const fetchCostsSaga = function* () {
  while(yield take(FETCH_COSTS_REQUEST)) {
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
  yield spawn(computedBalanceSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
