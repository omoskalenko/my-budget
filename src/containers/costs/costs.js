import API from '../../API';
import { Record } from 'immutable'
import { take, spawn, call, put, takeEvery } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { FETCH_ACCOUNTS_REQUEST } from '../accounts'
/** Constants */

export const moduleName = 'costs'


/** Actions */

export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`
export const ADD_COST_REQUEST = `${moduleName}/ADD_COST_REQUEST`
export const ADD_COST_SUCCESS = `${moduleName}/ADD_COST_SUCCESS`

/** Initial State */


const initialState = Record({
  list: [],
  isFetching: true,
  error: false,
  isSubmit: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COSTS_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false
      }
    }
    case FETCH_COSTS_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false
      }
    }
    case ADD_COST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isSubmit: false,
      }
    }
    case ADD_COST_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        isSubmit: true
      }
    }
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const costs = createSelector(stateSelector, state => state.list)

export const getCosts = createSelector(
  [costs],
  costs => costs
)


/** Actions Creators */

export const fetchCosts = () =>  ({ type: FETCH_COSTS_REQUEST })
export const addCost = (cost) =>  ({ type: ADD_COST_REQUEST, payload: cost })

/** Sagas */

export const fetchCostsSaga = function* () {
  while(yield take(FETCH_COSTS_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchCosts])
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

export const addCostSaga = function* (action) {
   try {
    const data = yield call([API, API.addCost], action.payload)    
    yield put({
      type: ADD_COST_SUCCESS
    })
    yield put({
      type: FETCH_COSTS_SUCCESS,
      payload: data
    })
    yield put({
      type: FETCH_ACCOUNTS_REQUEST,
    })
   } catch(error) {

   }
}

export const saga = function* () {

  yield spawn(fetchCostsSaga)
  yield takeEvery(ADD_COST_REQUEST, addCostSaga)
  
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
