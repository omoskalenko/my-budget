import API from '../../API';
import { Record } from 'immutable'
import * as yup from 'yup'
import moment from 'moment'
import { take, spawn, call, put, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { COMPUTED_ACCOUNTS_BALANCE } from '../accounts'
import { getPeriod } from '../parameters'
import { getTransactionsForPeriod } from '../../utils'
/** Constants */

export const moduleName = 'costs'

const Schema = yup.object().shape({
  category: yup.string().required(),
  name: yup.string().required(),
  amount: yup.number().required(),
  committed: yup.date().required(),
  account: yup.string().required(),
  plan: yup.boolean()
})

/** Actions */

export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`
export const ADD_COST_REQUEST = `${moduleName}/ADD_COST_REQUEST`
export const ADD_COST_SUCCESS = `${moduleName}/ADD_COST_SUCCESS`
export const ADD_COST_ERROR = `${moduleName}/ADD_COST_ERROR`
export const DELETE_COST_REQUEST = `${moduleName}/DELETE_COST_REQUEST`
export const DELETE_COST_SUCCESS = `${moduleName}/DELETE_COST_SUCCESS`
export const DELETE_COST_ERROR = `${moduleName}/DELETE_COST_ERROR`
/** Initial State */


const initialState = Record({
  list: [],
  isFetching: true,
  error: false,
  isSubmit: false,
})

/** Reducer */

export const reducer = (state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COSTS_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false
      }
    }
    case DELETE_COST_ERROR:
    case ADD_COST_ERROR:
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
        list: payload,
        isFetching: false,
        isSubmit: true
      }
    }
    case DELETE_COST_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case DELETE_COST_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false,
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
  [costs, getPeriod],
  (costs, getPeriod) => {
   return getTransactionsForPeriod(costs, getPeriod)
  }
)


/** Actions Creators */

export const fetchCosts = () => ({ type: FETCH_COSTS_REQUEST })
export const addCost = (cost) => ({ type: ADD_COST_REQUEST, payload: cost })
export const deleteCost = (id) => ({ type: DELETE_COST_REQUEST, payload: id })
/** Sagas */

export const fetchCostsSaga = function* () {
  while (yield take(FETCH_COSTS_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchCosts])
      yield put({
        type: FETCH_COSTS_SUCCESS,
        payload
      })
    } catch (error) {
      yield put({
        type: FETCH_COSTS_ERROR,
        error
      })
    }
  }
}

export const addCostSaga = function* (action) {
  try {
    Schema.validate(action.payload)
    const data = yield call([API, API.addCost], action.payload)
    console.log(data);

    yield put({
      type: ADD_COST_SUCCESS,
      payload: data,
    })
    yield put({
      type: COMPUTED_ACCOUNTS_BALANCE,
    })
  } catch (error) {
    yield put({
      type: ADD_COST_ERROR,
    })
  }
}

export const deleteCostSaga = function* (action) {
  try {
    const data = yield call([API, API.deleteCost], action.payload)
    yield put({
      type: DELETE_COST_SUCCESS,
      payload: data,
    })
    yield put({
      type: COMPUTED_ACCOUNTS_BALANCE,
    })
  } catch (error) {
    yield put({
      type: DELETE_COST_ERROR,
    })
  }
}

export const saga = function* () {
  yield spawn(fetchCostsSaga)
  yield takeEvery(ADD_COST_REQUEST, addCostSaga)
  yield takeEvery(DELETE_COST_REQUEST, deleteCostSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
