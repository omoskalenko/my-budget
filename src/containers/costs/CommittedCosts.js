import React, { useCallback } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Costs from '../../components/Costs'
import { connect } from 'react-redux'

import { addCost, deleteCost, getCommittedCosts, moduleName } from './costs'
import { getCostCategories } from '../directores'
import { getAccountsWithActulBalance } from '../balance'
import { TRANSACTIONS_STATUSES } from '../../config'

const transactionsStatus = TRANSACTIONS_STATUSES.COMMITTED

function CommittedCosts({
  isFetching,
  addCost,
  deleteCost,
  deleting,
  costs,
  categories,
  accounts,
  showDetail,
  isSubmit,
  config,
}) {

  const addCostCB = useCallback(addCost.bind(null, transactionsStatus), [addCost])
  const deleteCostCB = useCallback(deleteCost.bind(null, transactionsStatus), [deleteCost])

  return (
    <Costs
      isFetching={isFetching}
      addCost={addCostCB}
      isSubmit={isSubmit}
      deleteCost={deleteCostCB}
      deleting={deleting}
      costs={costs}
      categories={categories}
      showDetail={showDetail}
      accounts={accounts}
      config={config}
    />
  )
}
export default compose(
  connect(
    state => ({
      isFetching: state[moduleName][transactionsStatus].isFetching,
      costs: getCommittedCosts(state),
      deleting: state[moduleName][transactionsStatus].deleting,
      categories: getCostCategories(state),
      accounts: getAccountsWithActulBalance(state),
      isSubmit: state[moduleName][transactionsStatus].isSubmit,
      config: state[moduleName][transactionsStatus].config,
    }),
    dispatch => ({
      addCost: (transactionsStatus, cost) => dispatch(addCost(transactionsStatus, cost)),
      deleteCost: (transactionsStatus, id) => dispatch(deleteCost(transactionsStatus, id))
    })
  ),
   withError,
)(CommittedCosts)
