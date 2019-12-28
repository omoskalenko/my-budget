import React, { useCallback } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Incomes from '../../components/Incomes'
import { connect } from 'react-redux'

import { fetchIncomes, addIncome, deleteIncome, getCommittedIncomes, moduleName } from './incomes'
import { getIncomeCategories } from '../directores'
import { getAccountsWithActulBalance } from '../balance'
import { TRANSACTIONS_STATUSES } from '../../config'

const transactionsStatus = TRANSACTIONS_STATUSES.COMMITTED

function CommittedIncomes({
  isFetching,
  fetchIncomes,
  addIncome,
  deleteIncome,
  deleting,
  incomes,
  categories,
  accounts,
  isSubmit,
  config,
}) {

  const addIncomeCB = useCallback(addIncome.bind(null, transactionsStatus), [addIncome])
  const deleteIncomeCB = useCallback(deleteIncome.bind(null, transactionsStatus), [deleteIncome])

  return (
    <Incomes
      isFetching={isFetching}
      addIncome={addIncomeCB}
      deleteIncome={deleteIncomeCB}
      deleting={deleting}
      incomes={incomes}
      categories={categories}
      accounts={accounts}
      isSubmit={isSubmit}
      config={config}
    />
  )
}
export default compose(
  connect(
    state => ({
      isFetching: state[moduleName][transactionsStatus].isFetching,
      deleting: state[moduleName][transactionsStatus].deleting,
      incomes: getCommittedIncomes(state),
      categories: getIncomeCategories(state),
      accounts: getAccountsWithActulBalance(state),
      isSubmit: state[moduleName][transactionsStatus].isSubmit,
      config: state[moduleName][transactionsStatus].config,
    }),
    dispatch => ({
      fetchIncomes: transactionsStatus => dispatch(fetchIncomes(transactionsStatus)),
      addIncome: (transactionsStatus, income) => dispatch(addIncome(transactionsStatus, income)),
      deleteIncome: (transactionsStatus, id) => dispatch(deleteIncome(transactionsStatus, id)),
    })
  ),
   withError,
)(CommittedIncomes)
