import { Record } from 'immutable'
import { takeEvery, put } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import moment from 'moment'
import { CALC_PLANNED_BALANCE } from '../balance'
import { DEFAULT_PERIOD } from '../../config'

/** Constants */

export const moduleName = 'parameters'


/** Actions */

export const CHANGE_PERIOD = `${moduleName}/CHANGE_PERIOD`

/** Initial State */


const initialState = Record({
  dates: [],
  period: DEFAULT_PERIOD
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case CHANGE_PERIOD: {
      return state
        .set('dates', payload.dates )
        .set('period', payload.period )
    }
    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const dates = createSelector(stateSelector, state => state.dates)
export const period = createSelector(stateSelector, state => state.period)

export const getPeriod = createSelector(
  dates,
  dates => dates
)

export const getNextPeriod = createSelector(
  [dates, period],
  (dates, period) => {
    return dates.map(date => moment(date).add(1,`${period}s`))
  }
)

/** Actions Creators */

export const changePeriod = (dates, period) =>  ({ type: CHANGE_PERIOD, payload: { dates, period }  })

/** Sagas */

export const changePeriodSaga = function* (action) {

}


export const saga = function* () {
  yield takeEvery(CHANGE_PERIOD, changePeriodSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
