import React, { useEffect } from 'react'
import { compose } from 'redux'
import { BalanceFact } from '../../components/Balance/BalanceFact'
import { connect } from 'react-redux'
import withError from '../../HOC/withError'

import { fetchAccounts, getAccountsWhithActulBalance, moduleName } from './balance'

function BalanceFactContainer({
  isFetching,
  fetchAccounts,
  accounts,
}) {
  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])
  return (
    <BalanceFact
      isFetching={isFetching}
      accounts={accounts}
    />
  )
}
export default compose(
  connect(
    state => ({
      isFetching: state[moduleName].isFetching,
      accounts: getAccountsWhithActulBalance(state),
    }),
    dispatch => ({
      fetchAccounts: () => dispatch(fetchAccounts()),
    })
  ),
  withError,
)(BalanceFactContainer)
