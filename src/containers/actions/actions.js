import { Record } from 'immutable'
import { takeEvery } from  'redux-saga/effects'
import { createSelector } from 'reselect'
import moment from 'moment'


/** Constants */

export const moduleName = 'actions'


/** Actions */

export const SHOW_TRANSACTION_INFO = `${moduleName}/SHOW_TRANSACTION_INFO`

/** Initial State */


const initialState = Record({
  transaction: {},
  visible: false
})

/** Reducer */

export const reducer = ( state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case SHOW_TRANSACTION_INFO: {
      return state
        .set('transaction', payload)
        .set('visible', true )
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

export const showDetail = (transaction) =>  ({ type: SHOW_TRANSACTION_INFO, payload: transaction  })
export const handleOk = () => ({ type: ''})
export const handleCancel = () => ({ type: ''})

/** Sagas */

export const changePeriodSaga = function* (action) {

}


export const saga = function* () {
  yield takeEvery(SHOW_TRANSACTION_INFO, changePeriodSaga)
}



// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
