import { getAllData } from '../../API'
// import { Record } from 'immutable'
import { getBalance, normalize } from '../../utils'
import { take, spawn, call, put } from  'redux-saga/effects'
import { createSelector } from 'reselect'

/** Constants */

export const moduleName = 'main'


/** Actions */

export const FETCH_ALL_REQUEST = `${moduleName}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${moduleName}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_ERROR = `${moduleName}/FETCH_ALL_ERROR`

/** Initial State */


const initialState = {
  isFetching: false,
  error: false,
}

/** Reducer */

export const reducer = ( state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case FETCH_ALL_SUCCESS: {
      return {
        ...state,
        ...payload,
        isFetching: false
      }
    }
    case FETCH_ALL_ERROR: {
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

export const accounts = createSelector(stateSelector, state => state.accounts)
export const income = createSelector(stateSelector, state => state.income)
export const costs = createSelector(stateSelector, state => state.costs)
export const getAccountsWithBalance = createSelector(
  [accounts, income, costs],
  (accounts, income, costs) => normalize(accounts).map(account => {
    account.balance = getBalance(account.id, income.perfect, costs.perfect)
    return account
  })
)


/** Actions Creators */

export const fetchAll = () => ({ type: FETCH_ALL_REQUEST })

/** Sagas */

export const fetchAllSaga = function* () {
  while(yield take(FETCH_ALL_REQUEST)) {
    try {
      const payload = yield call(getAllData)

      yield put({
        type: FETCH_ALL_SUCCESS,
        payload
      })
    } catch(error) {
      yield put({
        type: FETCH_ALL_ERROR,
        error
      })
    }

  }
}

export const saga = function* () {
  yield spawn(fetchAllSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
