// export const calcActulBalanceSaga = function* () {
//   while (true) {
//     try {
//     yield take(CALC_BALANCE)
//     const accounts = yield select(state => accountsSelector(state))

//     if(!accounts || accounts.length === 0) break

//     const selectCosts = yield select(state => committedCosts(state))
//     const selectIncomes = yield select(state => committedIncomes(state))

//     const payload = accounts
//       .map(account => ({
//         accountId: account.id,
//         value: getBalance(account.id, selectIncomes, selectCosts)
//       }))
//       .reduce((res, balance) => {
//         res[balance.accountId] = balance.value
//         return res
//       }, {})

//     yield put({
//       type: SET_ACTUL_BALANCE,
//       payload
//     })
//   } catch(error) {
//     yield put({
//       type: SET_ACTUL_BALANCE,
//       payload: []
//     })
//   }
//   }
// }

// export const calcPlanedBalanceSaga = function* () {
//   while (true) {
//     try {
//       yield take(CALC_PLANNED_BALANCE)

//       const accounts = yield select(state => accountsSelector(state))

//       if(!accounts || accounts.length === 0) break

//       const balance = yield select(state => balanceSelector(state))
//       const selectCosts = yield select(state => plannedCosts(state))
//       const selectIncomes = yield select(state => plannedIncomes(state))
//       const period = yield select(state => getPeriod(state))
//       // Получаем плановые транзакции с настоящего дня до конечного дня выбранного в периоде, что бы получить сумму только будующих запланированных платежей
//       // Если дата начала больше дата конца то вернется пустой массив, соответственно баланс счета останется реальным
//       const costsForPeriod = getPlannedTransactionsForPeriod(selectCosts, [moment(), moment(period[1]).add(1, 'days')])
//       const incomesForPeriod = getPlannedTransactionsForPeriod(selectIncomes, [moment(), moment(period[1]).add(1, 'days')])
//       // Фильтр для отфильтровывания плановых транзакции по которым уже были совершены расходы/приходы, что бы повторно их не учитывать
//       const filter = transations => transations.filter(transation => !transation.isCommit)
//       // Добавляем свойство balance в счета с суммой реального остатка с планируемым
//       const payload = accounts
//         .map(account => ({
//           accountId: account.id,
//           // Получаем сумму планируемых остатков по счете и прибавляем текущий фактический остаток на счете
//           value: getBalance(account.id, filter(incomesForPeriod), filter(costsForPeriod), account.commit) + balance[account.id]
//         }))
//         .reduce((res, balance) => {
//           res[balance.accountId] = balance.value
//           return res
//         }, {})

//       yield put({
//         type: SET_PLANNED_BALANCE,
//         payload
//       })
//     } catch (error) {
//       yield put({
//         type: SET_PLANNED_BALANCE,
//         payload: []
//       })
//      }
//   }
// }

// export const fetchCostsSaga = function* () {
//   while (true) {
//     yield take(FETCH_COSTS_REQUEST)
//     try {
//       const payload = yield call([API, API.fetchCostsByCategory])

//       yield put({
//         type: FETCH_COSTS_SUCCESS,
//         payload
//       })
//     } catch (error) {
//       yield put({
//         type: FETCH_COSTS_ERROR,
//         error
//       })
//     }
//   }
// }
