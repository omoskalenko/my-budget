import API from '../../API';
import { Record } from 'immutable'
import { take, spawn, call, put, all } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { push } from 'connected-react-router';
import { PATHS } from '../../config';
import { fetchIncomes } from '../incomes/incomes';
import { fetchCosts } from '../costs/costs';
import { fetchAccounts } from '../balance';

/** Constants */

export const moduleName = 'directories'


/** Actions */

export const FETCH_DIRECTORIES_REQUEST = `${moduleName}/FETCH_DIRECTORIES_REQUEST`
export const FETCH_DIRECTORIES_SUCCESS = `${moduleName}/FETCH_DIRECTORIES_SUCCESS`
export const FETCH_DIRECTORIES_ERROR = `${moduleName}/FETCH_DIRECTORIES_ERROR`

/** Initial State */


const initialState = Record({
  categories: [],
  isFetching: false,
  error: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_DIRECTORIES_REQUEST: {
      return state
        .set('isFetching', true)
    }
    case FETCH_DIRECTORIES_SUCCESS: {
      return state
        .set('categories', payload.categories)
        .set('isFetching', false)
    }
    case FETCH_DIRECTORIES_ERROR: {
      return state
        .set('isFetching', false)
        .set('error', true)
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

export const getIncomeCategories = createSelector(
  categories,
  categories => categories.incomes
)




/** Actions Creators */

export const fetchDirectories = () =>  ({ type: FETCH_DIRECTORIES_REQUEST })

/** Sagas */

export const fetchDirectoriesSaga = function* () {
  while(yield take(FETCH_DIRECTORIES_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchDirectories])
      yield all([
        yield put(fetchAccounts()),
        yield put(fetchIncomes('committed')),
        yield put(fetchIncomes('planned')),
        yield put(fetchCosts('committed')),
        yield put(fetchCosts('planned')),
      ])
      yield put({
        type: FETCH_DIRECTORIES_SUCCESS,
        payload
      })

      if(window.location.pathname === '/') {
        yield put(push(PATHS.MAIN))
      }
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
