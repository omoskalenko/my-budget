import { spawn } from 'redux-saga/effects'
import { saga as mainSaga } from '../containers/main/main'

export default function * rootSaga() {
  yield spawn(mainSaga)
}
