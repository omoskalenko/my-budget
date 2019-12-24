import API from '../../API';
import { Record } from 'immutable'
import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import * as yup from 'yup'
import { take, spawn, call, put, takeEvery, race } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { COMPUTED_ACCOUNTS_BALANCE } from '../accounts'
import { getPeriod } from '../parameters'
import { getTransactionsForPeriod } from '../../utils'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  addTransactionRequest,
  addTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  error } from '../../utils/transactionsState'
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

export const FETCH_REQUEST = `${moduleName}/FETCH_REQUEST`
export const FETCH_COMMITTED_SUCCESS = `${moduleName}/FETCH_COMMITTED_SUCCESS`
export const FETCH_COMMITTED_ERROR = `${moduleName}/FETCH_COMMITTED_ERROR`
export const ADD_COMMITTED_REQUEST = `${moduleName}/ADD_COMMITTED_REQUEST`
export const ADD_COMMITTED_SUCCESS = `${moduleName}/ADD_COMMITTED_SUCCESS`
export const ADD_COMMITTED_ERROR = `${moduleName}/ADD_COMMITTED_ERROR`
export const DELETE_COMMITTED_REQUEST = `${moduleName}/DELETE_COMMITTED_REQUEST`
export const DELETE_COMMITTED_SUCCESS = `${moduleName}/DELETE_COMMITTED_SUCCESS`
export const DELETE_COMMITTED_ERROR = `${moduleName}/DELETE_COMMITTED_ERROR`
export const FETCH_PLAN_SUCCESS = `${moduleName}/FETCH_PLAN_SUCCESS`
export const FETCH_PLAN_ERROR = `${moduleName}/FETCH_PLAN_ERROR`
export const ADD_PLAN_REQUEST = `${moduleName}/ADD_PLAN_REQUEST`
export const ADD_PLAN_SUCCESS = `${moduleName}/ADD_PLAN_SUCCESS`
export const ADD_PLAN_ERROR = `${moduleName}/ADD_PLAN_ERROR`
export const DELETE_PLAN_REQUEST = `${moduleName}/DELETE_PLAN_REQUEST`
export const DELETE_PLAN_SUCCESS = `${moduleName}/DELETE_PLAN_SUCCESS`
export const DELETE_PLAN_ERROR = `${moduleName}/DELETE_PLAN_ERROR`

/** Initial State */

const initialState = () => ({
  list: [],
  isFetching: true,
  deleting: false,
  error: false,
  isSubmit: false,
})

const commitedState = initialState()
const plannedState = initialState()

/** Reducer */


export const committedReducer = createReducer(commitedState, {
  [FETCH_REQUEST]: (state, action) => fetchTransactionsRequest(state, action),
  [FETCH_COMMITTED_SUCCESS]: (state, action) => fetchTransactionsSuccess(state, action),
  [ADD_COMMITTED_REQUEST]: (state, action) => addTransactionRequest(state, action),
  [ADD_COMMITTED_SUCCESS]: (state, action) => addTransactionSuccess(state, action),
  [DELETE_COMMITTED_REQUEST]: (state, action) => deleteTransactionRequest(state, action),
  [DELETE_COMMITTED_SUCCESS]: (state, action) => deleteTransactionSuccess(state, action),
  [DELETE_COMMITTED_ERROR]: (state, action) => error(state, action),
  [ADD_COMMITTED_ERROR]: (state, action) => error(state, action),
  [FETCH_COMMITTED_ERROR]: (state, action) => error(state, action),
})

export const planReducer = createReducer(plannedState, {
  [FETCH_REQUEST]: (state, action) => fetchTransactionsRequest(state, action),
  [FETCH_PLAN_SUCCESS]: (state, action) => fetchTransactionsSuccess(state, action),
  [ADD_PLAN_REQUEST]: (state, action) => addTransactionRequest(state, action),
  [ADD_PLAN_SUCCESS]: (state, action) => addTransactionSuccess(state, action),
  [DELETE_PLAN_REQUEST]: (state, action) => deleteTransactionRequest(state, action),
  [DELETE_PLAN_SUCCESS]: (state, action) => deleteTransactionSuccess(state, action),
  [DELETE_PLAN_ERROR]: (state, action) => error(state, action),
  [ADD_PLAN_ERROR]: (state, action) => error(state, action),
  [FETCH_PLAN_ERROR]: (state, action) => error(state, action),
})

export const reducer = combineReducers({
  committed: committedReducer,
  planned: planReducer,
})

/** Selectors */

export const stateSelector = state => state[moduleName]

export const committedCosts = createSelector(stateSelector, state => state.committed.list)
export const plannedCosts = createSelector(stateSelector, state => state.planned.list)

export const getCommittedCosts = createSelector(
  [committedCosts, getPeriod],
  (committedCosts, getPeriod) => {
    return getTransactionsForPeriod(committedCosts, getPeriod)
  }
)
export const getPlannedCosts = createSelector(
  [plannedCosts, getPeriod],
  (committedCosts, getPeriod) => {
    return getTransactionsForPeriod(plannedCosts, getPeriod)
  }
)

/** Actions Creators */

export const fetchCosts = (transactionType) => ({ type: FETCH_REQUEST, transactionType })
export const addCost = (transactionType, cost) => ({ type: ADD_COMMITTED_REQUEST, payload: cost, transactionType })
export const deleteCost = (transactionType, id ) => ({ type: DELETE_COMMITTED_REQUEST, payload: id, transactionType })

/** Sagas */

export const fetchCostsSaga = function* (action) {
    try {
    const { transactionType } = action
    const payload = yield call([API, API.fetchCosts], transactionType)
    if (transactionType === 'committed') {
      yield put({
        type: FETCH_COMMITTED_SUCCESS,
        payload,
      })
    } else if (transactionType === 'planned') {
      yield put({
        type: FETCH_PLAN_SUCCESS,
        payload,
      })
    }
    } catch (error) {
      yield put({
        type: FETCH_COMMITTED_ERROR,
        error,
      })
    }
}

export const addCostSaga = function* (action) {
  try {
    Schema.validate(action.payload)
    const { payload, transactionType } = action
    const data = yield call([API, API.addCost], payload, transactionType)
    if (transactionType === 'committed') {
      yield put({
        type: ADD_COMMITTED_SUCCESS,
        payload: data,
      })
      yield put({
        type: COMPUTED_ACCOUNTS_BALANCE,
      })
    } else if (transactionType === 'planned') {
      yield put({
        type: ADD_PLAN_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    yield put({
      type: ADD_COMMITTED_ERROR,
    })
  }
}

export const deleteCostSaga = function* (action) {
  try {
    const { payload, transactionType } = action
    const data = yield call([API, API.deleteCost], payload, transactionType)
    if (transactionType === 'committed') {
    yield put({
      type: DELETE_COMMITTED_SUCCESS,
      payload: data,
    })
    yield put({
      type: COMPUTED_ACCOUNTS_BALANCE,
    })
  } else if (transactionType === 'planned') {
    yield put({
      type: DELETE_PLAN_SUCCESS,
      payload: data,
    })
  }
  } catch (error) {
    yield put({
      type: DELETE_COMMITTED_ERROR,
    })
  }
}

export const saga = function* () {
  yield spawn(fetchCostsSaga)
  yield takeEvery(FETCH_REQUEST, fetchCostsSaga)
  yield takeEvery(ADD_COMMITTED_REQUEST, addCostSaga)
  yield takeEvery(DELETE_COMMITTED_REQUEST, deleteCostSaga)
}




// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
