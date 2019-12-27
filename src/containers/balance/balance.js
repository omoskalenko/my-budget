import API from "../../API"
import { Record } from "immutable"
import { take, spawn, call, put, select, takeEvery } from "redux-saga/effects"
import { createSelector } from "reselect"
import { getPeriod, CHANGE_PERIOD } from "../parameters/index"
import { committedCosts, plannedCosts } from "../costs/costs"
import { committedIncomes, plannedIncomes } from "../incomes/incomes"
import { getBalance, getPlannedTransactionsForPeriod } from "../../utils/index"
import moment from "moment"

/** Constants */

export const moduleName = "balance"

/** Actions */

export const FETCH_ACCOUNTS_REQUEST = `${moduleName}/FETCH_ACCOUNTS_REQUEST`
export const FETCH_ACCOUNTS_SUCCESS = `${moduleName}/FETCH_ACCOUNTS_SUCCESS`
export const FETCH_ACCOUNTS_ERROR = `${moduleName}/FETCH_ACCOUNTS_ERROR`
export const FETCH_COSTS_REQUEST = `${moduleName}/FETCH_COSTS_REQUEST`
export const FETCH_COSTS_SUCCESS = `${moduleName}/FETCH_COSTS_SUCCESS`
export const FETCH_COSTS_ERROR = `${moduleName}/FETCH_COSTS_ERROR`
export const CALC_BALANCE = `${moduleName}/CALC_BALANCE`
export const SET_ACTUL_BALANCE = `${moduleName}/SET_ACTUL_BALANCE`
export const CALC_PLANNED_BALANCE = `${moduleName}/CALC_PLANNED_BALANCE`
export const SET_PLANNED_BALANCE = `${moduleName}/SET_PLANNED_BALANCE`
/** Initial State */

const initialState = Record({
  list: [],
  actulBalance: [],
  plannedBalance: [],
  isFetching: false,
  error: false
})

/** Reducer */

export const reducer = (state = new initialState(), action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ACCOUNTS_REQUEST: {
      return state.set('isFetching', true)
    }
    case FETCH_ACCOUNTS_SUCCESS: {
      return state
        .set('list', payload)
        .set('isFetching', false)
    }
    case FETCH_ACCOUNTS_ERROR: {
      return state
        .set('error', true)
        .set('isFetching', false)
    }
    case SET_ACTUL_BALANCE: {
      return state
        .set('actulBalance', payload)

    }
    case SET_PLANNED_BALANCE: {
      return state
        .set('plannedBalance', payload)
    }

    default:
      return state
  }
}

/** Selectors */

export const stateSelector = state => state[moduleName]

export const accountsSelector = createSelector(stateSelector, state => state.list)

export const balanceSelector = createSelector(stateSelector, state => state.actulBalance)

export const balancePlannedSelector = createSelector(stateSelector, state => state.plannedBalance)

export const getAccountsWhithActulBalance = createSelector(
  [accountsSelector, balanceSelector],
  (accountsSelector, balanceSelector) => {
    try {
      return accountsSelector.map(account => {
        account.balance = balanceSelector && balanceSelector[account.id]
        return account
      })
    } catch(error) {
      return accountsSelector
    }
  }
)

export const getAccountsWhithPlannedBalance = createSelector(
  [accountsSelector, balancePlannedSelector],
  (accountsSelector, balancePlannedSelector) => {
    try {
      return accountsSelector.map(account => {
        account.balance = balancePlannedSelector && balancePlannedSelector[account.id]
        return account
      })
    } catch(error) {
      return accountsSelector
    }
  }

)

/** Actions Creators */

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS_REQUEST })
export const fetchCosts = () => ({ type: FETCH_COSTS_REQUEST })
export const calcPlannedBalance = () => ({type: CALC_PLANNED_BALANCE})
/** Sagas */

export const fetchAccountsSaga = function* () {
  while (true) {
    try {
      yield take(FETCH_ACCOUNTS_REQUEST)
      const payload = yield call([API, API.fetchAccounts])
      yield put({
        type: FETCH_ACCOUNTS_SUCCESS,
        payload
      })
    } catch (error) {
      yield put({
        type: FETCH_ACCOUNTS_ERROR,
        error
      })
    }
  }
}

export const calcActulBalanceSaga = function* () {
  while (true) {
    try {
    yield take(CALC_BALANCE)
    const accounts = yield select(state => getAccountsWhithActulBalance(state))

    if(!accounts || accounts.length === 0) break

    const selectCosts = yield select(state => committedCosts(state))
    const selectIncomes = yield select(state => committedIncomes(state))

    const payload = accounts
      .map(account => ({
        accountId: account.id,
        value: getBalance(account.id, selectIncomes, selectCosts)
      }))
      .reduce((res, balance) => {
        res[balance.accountId] = balance.value
        return res
      }, {})

    yield put({
      type: SET_ACTUL_BALANCE,
      payload
    })
  } catch(error) {
    yield put({
      type: SET_ACTUL_BALANCE,
      payload: []
    })
  }
  }
}

export const calcPlanedBalanceSaga = function* () {
  while (true) {
    try {
      yield take(CALC_PLANNED_BALANCE)

      const accounts = yield select(state => accountsSelector(state))

      if(!accounts || accounts.length === 0) break

      const balance = yield select(state => balanceSelector(state))
      const selectCosts = yield select(state => plannedCosts(state))
      const selectIncomes = yield select(state => plannedIncomes(state))
      const period = yield select(state => getPeriod(state))
      // Получаем плановые транзакции с настоящего дня до конечного дня выбранного в периоде, что бы получить сумму только будующих запланированных платежей
      // Если дата начала больше дата конца то вернется пустой массив, соответственно баланс счета останется реальным
      const costsForPeriod = getPlannedTransactionsForPeriod(selectCosts, [moment(), moment(period[1]).add(1, 'days')])
      const incomesForPeriod = getPlannedTransactionsForPeriod(selectIncomes, [moment(), moment(period[1]).add(1, 'days')])
      // Фильтр для отфильтровывания плановых транзакции по которым уже были совершены расходы/приходы, что бы повторно их не учитывать
      const filter = transations => transations.filter(transation => !transation.isCommit)
      // Добавляем свойство balance в счета с суммой реального остатка с планируемым
      const payload = accounts
        .map(account => ({
          accountId: account.id,
          // Получаем сумму планируемых остатков по счете и прибавляем текущий фактический остаток на счете
          value: getBalance(account.id, filter(incomesForPeriod), filter(costsForPeriod), account.commit) + balance[account.id]
        }))
        .reduce((res, balance) => {
          res[balance.accountId] = balance.value
          return res
        }, {})

      yield put({
        type: SET_PLANNED_BALANCE,
        payload
      })
    } catch (error) {
      yield put({
        type: SET_PLANNED_BALANCE,
        payload: []
      })
     }
  }
}

export const fetchCostsSaga = function* () {
  while (true) {
    yield take(FETCH_COSTS_REQUEST)
    try {
      const payload = yield call([API, API.fetchCostsByCategory])

      yield put({
        type: FETCH_COSTS_SUCCESS,
        payload
      })
    } catch (error) {
      yield put({
        type: FETCH_COSTS_ERROR,
        error
      })
    }
  }
}

export const saga = function* () {
  yield spawn(fetchAccountsSaga)
  yield spawn(calcActulBalanceSaga)
  yield spawn(calcPlanedBalanceSaga)
}

// /**
// * Получить сумму транзакций по id транзакций
// *
// * @returns {@number} - сумма транзакций
// */
// export function getAmountByIdsTransactions(transactionIds, transactions) {
//   return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
// }
