import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Incomes from '../../components/Incomes'
import { connect } from 'react-redux'

import { fetchIncomes, addIncome, deleteIncome, getIncomes, moduleName } from './incomes'
import { getIncomeCategories } from '../directores'
import { getAccounts } from '../accounts'

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
    fetchIncomes()
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
      isFetching: state[moduleName].isFetching,
      deleting: state[moduleName].deleting,
      incomes: getIncomes(state),
      categories: getIncomeCategories(state),
      accounts: getAccounts(state),
      isSubmit: state[moduleName].isSubmit
    }),
    dispatch => ({
      fetchIncomes: () => dispatch(fetchIncomes()),
      addIncome: income => dispatch(addIncome(income)),
      deleteIncome: id => dispatch(deleteIncome(id)),
    })
  ),
   withError,
)(IncomesContainer)
