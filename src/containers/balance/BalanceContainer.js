import React, { useEffect } from 'react'
import { compose } from 'redux'
import { Accounts } from '../../components/Accounts/Accounts'
import { connect } from 'react-redux'
import withError from '../../HOC/withError'

import { fetchAccounts, getAccountsWhithActulBalance, moduleName } from './balance'

function BalanceContainer({
  isFetching,
  fetchAccounts,
  accounts,
}) {
  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])
  return (
    <Accounts
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
)(BalanceContainer)
