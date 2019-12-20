import React, { useEffect } from 'react'
import Main from '../../pages/Main'
import { connect } from 'react-redux'

import { fetchAll, getAccountsWithBalance, moduleName } from './main'

function MainContainer({
  isFetching,
  fetchAll,
  accounts,
}) {
  useEffect(() => {
    fetchAll()
  }, [fetchAll])
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
    accounts: getAccountsWithBalance(state)
  }),
  dispatch => ({
    fetchAll: () => dispatch(fetchAll())
  })
)(MainContainer)
