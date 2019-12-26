import { Record } from 'immutable'
import { take, spawn } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import moment from 'moment'
/** Constants */

export const moduleName = 'parameters'


/** Actions */

export const CHANGE_PERIOD = `${moduleName}/CHANGE_PERIOD`


/** Initial State */


const initialState = Record({
  dates: [moment().date(1), moment().date(31)],
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case CHANGE_PERIOD: {
      return {
        ...state,
        dates: payload,
      }
    }
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const dates = createSelector(stateSelector, state => state.dates)

export const getPeriod = createSelector(
  dates,
  dates => dates
)


/** Actions Creators */

export const changePeriod = (dates) =>  ({ type: CHANGE_PERIOD, payload: dates })

/** Sagas */

export const changePeriodSaga = function* () {
  while(yield take(CHANGE_PERIOD)) {
    try {

    } catch(error) {

    }
  }
}


export const saga = function* () {
  yield spawn(changePeriodSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
