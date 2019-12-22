import API from '../../API'
import { Record } from 'immutable'
import { take, spawn, call, put } from  'redux-saga/effects'
import { createSelector } from 'reselect'

/** Constants */

export const moduleName = 'main'


/** Actions */

export const FETCH_ACCOUNTS_REQUEST = `${moduleName}/FETCH_ACCOUNTS_REQUEST`
export const FETCH_ACCOUNTS_SUCCESS = `${moduleName}/FETCH_ACCOUNTS_SUCCESS`
export const FETCH_ACCOUNTS_ERROR = `${moduleName}/FETCH_ACCOUNTS_ERROR`

/** Initial State */


const initialState = Record({
  accounts: null,
  isFetching: true,
  error: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    // case FETCH_ACCOUNTS_REQUEST: {
    //   return {
    //     ...state,
    //     isFetching: true
    //   }
    // }
    case FETCH_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        accounts: payload,
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

export const accounts = createSelector(stateSelector, state => state.accounts)

export const getAccounts = createSelector(
  [accounts],
  accounts => accounts
)


/** Actions Creators */

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS_REQUEST })

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
