import API from '../../API';
import { Record } from 'immutable'
import * as yup from 'yup'
import { take, spawn, call, put, takeEvery } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { COMPUTED_ACCOUNTS_BALANCE } from '../accounts'
import { getPeriod } from '../parameters'
import { getTransactionsForPeriod } from '../../utils'
/** Constants */

export const moduleName = 'incomes'

const Schema = yup.object().shape({
  category: yup.string().required(),
  name: yup.string(),
  amount: yup.number().required(),
  committed: yup.date().required(),
  account: yup.string().required(),
  plan: yup.boolean()
})

/** Actions */

export const FETCH_INCOMES_REQUEST = `${moduleName}/FETCH_INCOMES_REQUEST`
export const FETCH_INCOMES_SUCCESS = `${moduleName}/FETCH_INCOMES_SUCCESS`
export const FETCH_INCOMES_ERROR = `${moduleName}/FETCH_INCOMES_ERROR`
export const ADD_INCOME_REQUEST = `${moduleName}/ADD_INCOME_REQUEST`
export const ADD_INCOME_SUCCESS = `${moduleName}/ADD_INCOME_SUCCESS`
export const ADD_INCOME_ERROR = `${moduleName}/ADD_INCOME_ERROR`
export const DELETE_INCOME_REQUEST = `${moduleName}/DELETE_INCOME_REQUEST`
export const DELETE_INCOME_SUCCESS = `${moduleName}/DELETE_INCOME_SUCCESS`
export const DELETE_INCOME_ERROR = `${moduleName}/DELETE_INCOME_ERROR`
/** Initial State */


const initialState = Record({
  list: [],
  isFetching: true,
  deleting: false,
  error: false,
  isSubmit: false,
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_INCOMES_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false
      }
    }
    case ADD_INCOME_ERROR:
    case DELETE_INCOME_ERROR:
    case FETCH_INCOMES_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false,
        deleting: false,
      }
    }
    case ADD_INCOME_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isSubmit: false,
      }
    }
    case DELETE_INCOME_REQUEST: {
      return {
        ...state,
        deleting: true,
      }
    }
    case ADD_INCOME_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false,
        isSubmit: true
      }
    }
    case DELETE_INCOME_SUCCESS: {
      return {
        ...state,
        list: payload,
        deleting: false,
      }
    }
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const incomes = createSelector(stateSelector, state => state.list)

export const getIncomes = createSelector(
  [incomes, getPeriod],
  (incomes, getPeriod)=> {
    return getTransactionsForPeriod(incomes, getPeriod)
  }
)


/** Actions Creators */

export const fetchIncomes = () =>  ({ type: FETCH_INCOMES_REQUEST })
export const addIncome = (income) =>  ({ type: ADD_INCOME_REQUEST, payload: income })
export const deleteIncome = (id) =>  ({ type: DELETE_INCOME_REQUEST, payload: id })
/** Sagas */

export const fetchIncomesSaga = function* () {
  while(yield take(FETCH_INCOMES_REQUEST)) {
    try {
      const payload = yield call([API, API.fetchIncomes])
      yield put({
        type: FETCH_INCOMES_SUCCESS,
        payload
      })
    } catch(error) {
      yield put({
        type: FETCH_INCOMES_ERROR,
        error
      })
    }
  }
}

export const addIncomeSaga = function* (action) {
   try {
    Schema.validate(action.payload)
    const data = yield call([API, API.addIncome], action.payload)
    yield put({
      type: ADD_INCOME_SUCCESS,
      payload: data
    })
    yield put({
      type: COMPUTED_ACCOUNTS_BALANCE,
    })
   } catch(error) {
    yield put({
      type: ADD_INCOME_ERROR
    })
   }
}

export const deleteIncomeSaga = function* (action) {
  try {
   const data = yield call([API, API.deleteIncome], action.payload)
   yield put({
     type: DELETE_INCOME_SUCCESS,
     payload: data
   })
   yield put({
     type: COMPUTED_ACCOUNTS_BALANCE,
   })
  } catch(error) {
   yield put({
     type: DELETE_INCOME_ERROR
   })
  }
}

export const saga = function* () {
  yield spawn(fetchIncomesSaga)
  yield takeEvery(ADD_INCOME_REQUEST, addIncomeSaga)
  yield takeEvery(DELETE_INCOME_REQUEST, deleteIncomeSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
