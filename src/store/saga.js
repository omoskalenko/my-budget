import { spawn } from 'redux-saga/effects'
import { saga as accountsSaga } from '../containers/balance'
import { saga as costsSaga } from '../containers/costs'
import { saga as incomesSaga } from '../containers/incomes'
import { saga as directoriesSaga } from '../containers/directores'
import { saga as parametersSaga } from '../containers/parameters'
import { saga as actionsSaga } from '../containers/actions'

export default function * rootSaga() {
  yield spawn(accountsSaga)
  yield spawn(costsSaga)
  yield spawn(incomesSaga)
  yield spawn(directoriesSaga)
  yield spawn(parametersSaga)
  yield spawn(actionsSaga)
}
