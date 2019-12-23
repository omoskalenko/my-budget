import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Incomes from '../../components/Incomes'
import { connect } from 'react-redux'

import { fetchIncomes, addIncome, getIncomes, moduleName } from './incomes'
import { getIncomeCategories } from '../directores'
import { getAccounts } from '../accounts'

function IncomesContainer({
  isFetching,
  fetchIncomes,
  addIncome,
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
      incomes: getIncomes(state),
      categories: getIncomeCategories(state),
      accounts: getAccounts(state),
      isSubmit: state[moduleName].isSubmit
    }),
    dispatch => ({
      fetchIncomes: () => dispatch(fetchIncomes()),
      addIncome: income => dispatch(addIncome(income))
    })
  ),
   withError,
)(IncomesContainer)
