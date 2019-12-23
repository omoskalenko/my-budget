import API from '../../API';
import { Record } from 'immutable'
import * as yup from 'yup'
import moment from 'moment'
import { take, spawn, call, put, takeEvery } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import { COMPUTED_ACCOUNTS_BALANCE } from '../accounts'
/** Constants */

export const moduleName = 'incomes'

const Schema = yup.object().shape({
  category: yup.string().required(),
  name: yup.string().required(),
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
    case FETCH_INCOMES_SUCCESS: {
      return {
        ...state,
        list: payload,
        isFetching: false
      }
    }
    case FETCH_INCOMES_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false
      }
    }
    case ADD_INCOME_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isSubmit: false,
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
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const incomes = createSelector(stateSelector, state => state.list)

export const getIncomes = createSelector(
  [incomes],
  incomes => incomes.map(cost => {
    cost.committed = moment(cost.committed).format('DD.MM.YYYY')
    return cost
  } )
)


/** Actions Creators */

export const fetchIncomes = () =>  ({ type: FETCH_INCOMES_REQUEST })
export const addIncome = (cost) =>  ({ type: ADD_INCOME_REQUEST, payload: cost })

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

export const saga = function* () {
  yield spawn(fetchIncomesSaga)
  yield takeEvery(ADD_INCOME_REQUEST, addIncomeSaga)

}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
