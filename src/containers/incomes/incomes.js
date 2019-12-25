import API from '../../API';
import { Record } from 'immutable'
import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import * as yup from 'yup'
import { take, spawn, call, put, takeEvery, race } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { COMPUTED_ACCOUNTS_BALANCE, COMPUTED_PLANNED_BALANCE } from '../accounts'
import { getPeriod } from '../parameters'
import { getTransactionsForPeriod, validateTransaction } from '../../utils'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  addTransactionRequest,
  addTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  error } from '../../utils/transactionsState'
import { TRANSACTIONS_STATUSES, TRANSACTIONS_TYPES, TRANSACTIONS_TITLES} from '../../config'
/** Constants */

export const moduleName = TRANSACTIONS_TYPES.INCOMES

const schemas = {
  committed: yup.object().shape({
    account: yup.string().required(),
    category: yup.string().required(),
    name: yup.string().required(),
    amount: yup.number().required(),
    commit: yup.date().required(),
  }),
  planned: yup.object().shape({
    account: yup.string(),
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
  isFetching: true,
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

export const committedIncomes = createSelector(stateSelector, state => state.committed.list)
export const plannedIncomes = createSelector(stateSelector, state => state.planned.list)

export const getCommittedIncomes = createSelector(
  [committedIncomes, getPeriod],
  (committedIncomes, getPeriod) => {
    return getTransactionsForPeriod(committedIncomes, getPeriod, TRANSACTIONS_STATUSES.COMMITTED)
  }
)
export const getPlannedIncomes = createSelector(
  [plannedIncomes, getPeriod],
  (plannedIncomes, getPeriod) => {
    return getTransactionsForPeriod(plannedIncomes, getPeriod, TRANSACTIONS_STATUSES.PLANNED)
  }
)

/** Actions Creators */

export const fetchIncomes = (transactionsStatus) => {
  const actions = {
    'committed': FETCH_COMMITTED_REQUEST,
    'planned':  FETCH_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], transactionsStatus }
}
export const addIncome = (transactionsStatus, income) => {
  const actions = {
    'committed': ADD_COMMITTED_REQUEST,
    'planned': ADD_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], payload: income, transactionsStatus }
}

export const deleteIncome = (transactionsStatus, income ) => {
  const actions = {
    'committed': DELETE_COMMITTED_REQUEST,
    'planned': DELETE_PLANNED_REQUEST,
  }
  return { type: actions[transactionsStatus], payload: income, transactionsStatus }
}

/** Sagas */

export const fetchIncomesSaga = function* (action) {
    try {
    const { transactionsStatus } = action
    const payload = yield call([API, API.fetchIncomes], transactionsStatus)
    if (transactionsStatus === 'committed') {
      yield put({
        type: FETCH_COMMITTED_SUCCESS,
        payload,
      })
    } else if (transactionsStatus === 'planned') {
      yield put({
        type: FETCH_PLANNED_SUCCESS,
        payload,
      })
      yield put({
        type: COMPUTED_PLANNED_BALANCE,
      })
    }
    } catch (error) {
      yield put({
        type: FETCH_COMMITTED_ERROR,
        error,
      })
    }
}

export const addIncomeSaga = function* (action) {
  try {
    const { payload, transactionsStatus } = action
    validateTransaction({ type: transactionsStatus, payload}, schemas)
    const data = yield call([API, API.addIncome], payload, transactionsStatus)
    if (transactionsStatus === 'committed') {
      yield put({
        type: ADD_COMMITTED_SUCCESS,
        payload: data,
      })
      yield put({
        type: COMPUTED_ACCOUNTS_BALANCE,
      })
    } else if (transactionsStatus === 'planned') {
      yield put({
        type: ADD_PLANNED_SUCCESS,
        payload: data,
      })
      yield put({
        type: COMPUTED_PLANNED_BALANCE,
      })
    }
  } catch (error) {
    yield put({
      type: ADD_COMMITTED_ERROR,
    })
  }
}

export const deleteIncomeSaga = function* (action) {
  try {
    const { payload, transactionsStatus } = action
    const data = yield call([API, API.deleteIncome], payload, transactionsStatus)
    if (transactionsStatus === 'committed') {
    yield put({
      type: DELETE_COMMITTED_SUCCESS,
      payload: data,
      id: payload
    })
    yield put({
      type: COMPUTED_ACCOUNTS_BALANCE,
    })
  } else if (transactionsStatus === 'planned') {
    yield put({
      type: DELETE_PLANNED_SUCCESS,
      payload: data,
      id: payload
    })
    yield put({
      type: COMPUTED_PLANNED_BALANCE,
    })
  }
  } catch (error) {
    yield put({
      type: DELETE_COMMITTED_ERROR,
    })
  }
}

export const saga = function* () {
  yield spawn(fetchIncomesSaga)
  yield takeEvery(FETCH_COMMITTED_REQUEST, fetchIncomesSaga)
  yield takeEvery(FETCH_PLANNED_REQUEST, fetchIncomesSaga)
  yield takeEvery(ADD_COMMITTED_REQUEST, addIncomeSaga)
  yield takeEvery(DELETE_COMMITTED_REQUEST, deleteIncomeSaga)
  yield takeEvery(ADD_PLANNED_REQUEST, addIncomeSaga)
  yield takeEvery(DELETE_PLANNED_REQUEST, deleteIncomeSaga)
}




// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
