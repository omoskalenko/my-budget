import API from '../../API';
// import { Record } from 'immutable'
import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import * as yup from 'yup'
import { spawn, call, put, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { CALC_BALANCE, CALC_PLANNED_BALANCE } from '../balance'
import { getPeriod } from '../parameters'
import { getTransactionsForPeriod, validateTransaction, getPlannedTransactionsForPeriod} from '../../utils'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  addTransactionRequest,
  addTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  error } from '../../utils/transactionsState'
import { TRANSACTIONS_STATUSES, TRANSACTIONS_TYPES } from '../../config'

/** Constants */

export const moduleName = TRANSACTIONS_TYPES.COSTS

const schemas = {
  committed: yup.object().shape({
    account: yup.string().required(),
    category: yup.string().required(),
    name: yup.string().required(),
    amount: yup.number().required(),
    commit: yup.date().required(),
  }),
  planned: yup.object().shape({
    account: yup.string().required(),
    category: yup.string().required(),
    name: yup.string(),
    amount: yup.number().required(),
    start: yup.date().required(),
    periodicity: yup.string(),
  })
}

/** Actions */

export const FETCH_COMMITTED_REQUEST = `${moduleName}/FETCH_COMMITTED_REQUEST`
export const FETCH_COMMITTED_SUCCESS = `${moduleName}/FETCH_COMMITTED_SUCCESS`
export const FETCH_COMMITTED_ERROR = `${moduleName}/FETCH_COMMITTED_ERROR`
export const ADD_COMMITTED_REQUEST = `${moduleName}/ADD_COMMITTED_REQUEST`
export const ADD_COMMITTED_SUCCESS = `${moduleName}/ADD_COMMITTED_SUCCESS`
export const ADD_COMMITTED_ERROR = `${moduleName}/ADD_COMMITTED_ERROR`
export const DELETE_COMMITTED_REQUEST = `${moduleName}/DELETE_COMMITTED_REQUEST`
export const DELETE_COMMITTED_SUCCESS = `${moduleName}/DELETE_COMMITTED_SUCCESS`
export const DELETE_COMMITTED_ERROR = `${moduleName}/DELETE_COMMITTED_ERROR`
export const FETCH_PLANNED_REQUEST = `${moduleName}/FETCH_PLANNED_REQUEST`
export const FETCH_PLANNED_SUCCESS = `${moduleName}/FETCH_PLANNED_SUCCESS`
export const FETCH_PLANNED_ERROR = `${moduleName}/FETCH_PLANNED_ERROR`
export const ADD_PLANNED_REQUEST = `${moduleName}/ADD_PLANNED_REQUEST`
export const ADD_PLANNED_SUCCESS = `${moduleName}/ADD_PLANNED_SUCCESS`
export const ADD_PLANNED_ERROR = `${moduleName}/ADD_PLANNED_ERROR`
export const DELETE_PLANNED_REQUEST = `${moduleName}/DELETE_PLANNED_REQUEST`
export const DELETE_PLANNED_SUCCESS = `${moduleName}/DELETE_PLANNED_SUCCESS`
export const DELETE_PLANNED_ERROR = `${moduleName}/DELETE_PLANNED_ERROR`

/** Initial State */

const initialState = (status) => ({
  list: [],
  isFetching: false,
  deleting: false,
  error: false,
  isSubmit: false,
  config: {
    type: moduleName,
    status,
  }
})


const commitedState = initialState(TRANSACTIONS_STATUSES.COMMITTED)
const plannedState = initialState(TRANSACTIONS_STATUSES.PLANNED)

/** Reducer */


export const committedReducer = createReducer(commitedState, {
  [FETCH_COMMITTED_REQUEST]: (state, action) => fetchTransactionsRequest(state, action),
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
  [FETCH_PLANNED_REQUEST]: (state, action) => fetchTransactionsRequest(state, action),
  [FETCH_PLANNED_SUCCESS]: (state, action) => fetchTransactionsSuccess(state, action),
  [ADD_PLANNED_REQUEST]: (state, action) => addTransactionRequest(state, action),
  [ADD_PLANNED_SUCCESS]: (state, action) => addTransactionSuccess(state, action),
  [DELETE_PLANNED_REQUEST]: (state, action) => deleteTransactionRequest(state, action),
  [DELETE_PLANNED_SUCCESS]: (state, action) => deleteTransactionSuccess(state, action),
  [DELETE_PLANNED_ERROR]: (state, action) => error(state, action),
  [ADD_PLANNED_ERROR]: (state, action) => error(state, action),
  [FETCH_PLANNED_ERROR]: (state, action) => error(state, action),
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
    return getTransactionsForPeriod(committedCosts, getPeriod, TRANSACTIONS_STATUSES.COMMITTED)
  }
)
export const getPlannedCosts = createSelector(
  [plannedCosts, getPeriod],
  (plannedCosts, getPeriod) => {
    return getPlannedTransactionsForPeriod(plannedCosts, getPeriod)
  }
)



/** Actions Creators */

export const fetchCosts = (transactionsStatus) => {
  const actions = {
    'committed': FETCH_COMMITTED_REQUEST,
    'planned':  FETCH_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], transactionsStatus }
}
export const addCost = (transactionsStatus, cost) => {
  const actions = {
    'committed': ADD_COMMITTED_REQUEST,
    'planned': ADD_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], payload: cost, transactionsStatus }
}

export const deleteCost = (transactionsStatus, cost ) => {
  const actions = {
    'committed': DELETE_COMMITTED_REQUEST,
    'planned': DELETE_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], payload: cost, transactionsStatus }
}

/** Sagas */

export const fetchCostsSaga = function* (action) {
    try {
    const { transactionsStatus } = action
    const payload = yield call([API, API.fetchCosts], transactionsStatus)
    if (transactionsStatus === 'committed') {
      yield put({
        type: FETCH_COMMITTED_SUCCESS,
        payload,
      })
      yield put({
        type: CALC_BALANCE,
      })
      yield put({
        type: CALC_PLANNED_BALANCE,
      });
    } else if (transactionsStatus === 'planned') {
      yield put({
        type: FETCH_PLANNED_SUCCESS,
        payload,
      })
      yield put({
        type: CALC_PLANNED_BALANCE,
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
    const { payload, transactionsStatus } = action
    validateTransaction({ type: transactionsStatus, payload}, schemas)
    const data = yield call([API, API.addCost], {...payload, committed: []}, transactionsStatus)
    if (transactionsStatus === 'committed') {
      yield put({
        type: ADD_COMMITTED_SUCCESS,
        payload: data,
      })
      yield put({
        type: CALC_BALANCE,
      })
    } else if (transactionsStatus === 'planned') {
      yield put({
        type: ADD_PLANNED_SUCCESS,
        payload: data,
      })
      yield put({
        type: CALC_PLANNED_BALANCE,
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
    const { payload, transactionsStatus } = action
    const data = yield call([API, API.deleteCost], payload, transactionsStatus)
    if (transactionsStatus === 'committed') {
    yield put({
      type: DELETE_COMMITTED_SUCCESS,
      payload: data,
      id: payload
    })
    yield put({
      type: CALC_BALANCE,
    })
  } else if (transactionsStatus === 'planned') {
    yield put({
      type: DELETE_PLANNED_SUCCESS,
      payload: data,
      id: payload
    })
    yield put({
      type: CALC_PLANNED_BALANCE,
    })
  }
  } catch (error) {
    yield put({
      type: DELETE_COMMITTED_ERROR,
    })
  }
}

export const saga = function* () {
  // yield spawn(fetchCostsSaga)
  yield takeEvery(FETCH_COMMITTED_REQUEST, fetchCostsSaga)
  yield takeEvery(FETCH_PLANNED_REQUEST, fetchCostsSaga)
  yield takeEvery(ADD_COMMITTED_REQUEST, addCostSaga)
  yield takeEvery(DELETE_COMMITTED_REQUEST, deleteCostSaga)
  yield takeEvery(ADD_PLANNED_REQUEST, addCostSaga)
  yield takeEvery(DELETE_PLANNED_REQUEST, deleteCostSaga)
}




// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
