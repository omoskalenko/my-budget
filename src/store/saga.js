import { spawn } from 'redux-saga/effects'
import { saga as accountsSaga } from '../containers/accounts'
import { saga as costsSaga } from '../containers/costs'
import { saga as incomesSaga } from '../containers/incomes'
import { saga as directoriesSaga } from '../containers/directores'

export default function * rootSaga() {
  yield spawn(accountsSaga)
  yield spawn(costsSaga)
  yield spawn(incomesSaga)
  yield spawn(directoriesSaga)
}
