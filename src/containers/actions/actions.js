import { Record } from 'immutable'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import moment from 'moment'
import API from '../../API'
import { FETCH_PLANNED_SUCCESS as FETCH_PLANNED_SUCCESS_INCOMES, schemas as incomesSchemas } from '../incomes'
import { FETCH_PLANNED_SUCCESS as FETCH_PLANNED_SUCCESS_COSTS, schemas as costsSchemas } from '../costs'

/** Constants */

export const moduleName = 'actions'


/** Actions */

export const SHOW_DETAIL = `${moduleName}/SHOW_DETAIL`
export const CLOSE_DETAIL = `${moduleName}/CLOSE_DETAIL`
export const COMMIT_TRANSACTION_REQUEST = `${moduleName}/COMMIT_TRANSACTION_REQUEST`
export const COMMIT_TRANSACTION_SUCCESS = `${moduleName}/COMMIT_TRANSACTION_SUCCESS`
export const COMMIT_TRANSACTION_ERROR = `${moduleName}/COMMIT_TRANSACTION_ERROR`
export const BIND_TRANSACTION_REQUEST = `${moduleName}/BIND_TRANSACTION_REQUEST`
export const BIND_TRANSACTION_SUCCESS = `${moduleName}/BIND_TRANSACTION_SUCCESS`
export const BIND_TRANSACTION_ERROR = `${moduleName}/BIND_TRANSACTION_ERROR`
export const SKIP_TRANSACTION_REQUEST = `${moduleName}/SKIP_TRANSACTION_REQUEST`
export const SKIP_TRANSACTION_SUCCESS = `${moduleName}/SKIP_TRANSACTION_SUCCESS`
export const SKIP_TRANSACTION_ERROR = `${moduleName}/SKIP_TRANSACTION_ERROR`
/** Initial State */


const initialState = Record({
  transaction: {},
  target: {},
  visible: false,
  isFetching: false,
})

/** Reducer */

export const reducer = (state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case SHOW_DETAIL: {
      return state
        .set('transaction', payload.transaction)
        .set('target', payload.target)
        .set('visible', true)
    }
    case CLOSE_DETAIL: {
      return state
        .set('transaction', {})
        .set('visible', false)
    }
    case COMMIT_TRANSACTION_REQUEST: {
      return state
        .set('isFetching', true)
    }
    case COMMIT_TRANSACTION_ERROR:
    case COMMIT_TRANSACTION_SUCCESS: {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const isVisible = createSelector(stateSelector, state => state.visible)

export const getTransaction = createSelector(stateSelector, state => state.transaction)


/** Actions Creators */

export const showDetail = (transaction, target) => ({ type: SHOW_DETAIL, payload: { transaction, target } })
export const closeDetail = () => ({ type: CLOSE_DETAIL })
export const commit = (transaction, target) => ({ type: COMMIT_TRANSACTION_REQUEST, payload: { transaction, target } })
export const bind = (transaction, target) => ({ type: BIND_TRANSACTION_REQUEST, payload: { transaction, target } })
export const skip = (transaction, target) => ({ type: SKIP_TRANSACTION_REQUEST, payload: { transaction, target } })
export const handleOk = () => ({ type: '' })
export const handleCancel = () => ({ type: '' })

/** Sagas */

export const commitSaga = function* (action) {
  try {
    const originTransaction = yield select(state => stateSelector(state).transaction)
    const target = yield select(state => stateSelector(state).target)
    const { account, category, name, amount, start } = originTransaction
    const transaction = {
      account: account.id,
      category: category.id,
      name,
      amount,
      commit: start,
    }
    const id = originTransaction.id

    if (target.type === 'incomes') {
      incomesSchemas.committed.isValidSync(transaction)
    } else if (target.type === 'costs') {
      costsSchemas.committed.isValidSync(transaction)
    }

    const payload = yield call([API, API.commitTransaction], id, transaction, target)
    if (target.type === 'incomes') {
      yield put({ type: FETCH_PLANNED_SUCCESS_INCOMES, payload, transactionsStatus: target.type })
    } else if (target.type === 'costs') {
      yield put({ type: FETCH_PLANNED_SUCCESS_COSTS, payload, transactionsStatus: target.type })
    }

  } catch (error) {
    yield put({ type: COMMIT_TRANSACTION_ERROR })
  }
}


export const saga = function* () {
  yield takeEvery(COMMIT_TRANSACTION_REQUEST, commitSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
