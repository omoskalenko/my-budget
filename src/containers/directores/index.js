import API from '../../API';
import { Record } from 'immutable'
import { take, spawn, call, put, takeEvery } from  'redux-saga/effects'
import { createSelector } from 'reselect'

/** Constants */

export const moduleName = 'directories'


/** Actions */

export const FETCH_DIRECTORIES_REQUEST = `${moduleName}/FETCH_DIRECTORIES_REQUEST`
export const FETCH_DIRECTORIES_SUCCESS = `${moduleName}/FETCH_DIRECTORIES_SUCCESS`
export const FETCH_DIRECTORIES_ERROR = `${moduleName}/FETCH_DIRECTORIES_ERROR`

/** Initial State */


const initialState = Record({
  categories: [],
  isFetching: true,
  error: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_DIRECTORIES_SUCCESS: {
      return {
        ...state,
        ...payload,
        isFetching: false
      }
    }
    case FETCH_DIRECTORIES_ERROR: {
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

export const categories = createSelector(stateSelector, state => state.categories)

export const getCostCategories = createSelector(
  categories,
  categories => categories.costs
)


/** Actions Creators */

export const fetchDirectories = () =>  ({ type: FETCH_DIRECTORIES_REQUEST })

/** Sagas */

export const fetchDirectoriesSaga = function* () {
  while(yield take(FETCH_DIRECTORIES_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchDirectories])
      yield put({
        type: FETCH_DIRECTORIES_SUCCESS,
        payload
      })
    } catch(error) {
      yield put({
        type: FETCH_DIRECTORIES_ERROR,
        error
      })
    }
  }
}


export const saga = function* () {
  yield spawn(fetchDirectoriesSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
