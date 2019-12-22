import React, { useEffect } from 'react'
import Main from '../../pages/Main'
import { connect } from 'react-redux'

import { fetchAccounts, getAccounts, moduleName } from './main'

function MainContainer({
  isFetching,
  fetchAccounts,
  accounts,
}) {
  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])
  return (
    <Main
      isFetching={isFetching}
      accounts={accounts}
    />
  )
}
export default connect(
  state => ({
    isFetching: state[moduleName].isFetching,
    accounts: getAccounts(state)
  }),
  dispatch => ({
    fetchAccounts: () => dispatch(fetchAccounts())
  })
)(MainContainer)
