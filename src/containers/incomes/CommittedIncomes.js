import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Incomes from '../../components/Incomes'
import { connect } from 'react-redux'

import { fetchIncomes, addIncome, deleteIncome, getCommittedIncomes, moduleName } from './incomes'
import { getIncomeCategories } from '../directores'
import { getAccounts } from '../accounts'

const transactionsType = 'committed'

function IncomesContainer({
  isFetching,
  fetchIncomes,
  addIncome,
  deleteIncome,
  deleting,
  incomes,
  categories,
  accounts,
  isSubmit
}) {
  useEffect(() => {
    fetchIncomes(transactionsType)
  }, [fetchIncomes])
  return (
    <Incomes
      isFetching={isFetching}
      addIncome={addIncome}
      deleteIncome={deleteIncome}
      deleting={deleting}
      incomes={incomes}
      categories={categories}
      accounts={accounts}
      isSubmit={isSubmit}
    />
  )
}
export default compose(
  connect(
    state => ({
      isFetching: state[moduleName][transactionsType].isFetching,
      deleting: state[moduleName][transactionsType].deleting,
      incomes: getCommittedIncomes(state),
      categories: getIncomeCategories(state),
      accounts: getAccounts(state),
      isSubmit: state[moduleName][transactionsType].isSubmit
    }),
    dispatch => ({
      fetchIncomes: type => dispatch(fetchIncomes(type)),
      addIncome: (type, income) => dispatch(addIncome(type, income)),
      deleteIncome: (type, id) => dispatch(deleteIncome(type, id)),
    })
  ),
   withError,
)(IncomesContainer)
