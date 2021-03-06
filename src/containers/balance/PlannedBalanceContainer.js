import React from 'react'
import { compose } from 'redux'
import { Accounts } from '../../components/Accounts/Accounts'
import { connect } from 'react-redux'
import withError from '../../HOC/withError'

import { fetchAccounts, moduleName } from './balance'

function BalanceContainer({
  isFetching,
  accounts,
}) {
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
    }),
    dispatch => ({
      fetchAccounts: () => dispatch(fetchAccounts()),
    })
  ),
  withError,
)(BalanceContainer)
