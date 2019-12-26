import React, { useEffect, useCallback } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Costs from '../../components/Costs'
import { connect } from 'react-redux'

import { fetchCosts, addCost, deleteCost, getPlannedCosts, moduleName } from './costs'
import { getCostCategories } from '../directores'
import { getAccountsWhithPlannedBalance } from '../balance'
import { TRANSACTIONS_STATUSES } from '../../config'

const transactionsStatus = TRANSACTIONS_STATUSES.PLANNED

function PlannedCosts({
  isFetching,
  fetchCosts,
  addCost,
  deleteCost,
  deleting,
  costs,
  categories,
  accounts,
  isSubmit,
  config,
}) {
  useEffect(() => {
    fetchCosts(transactionsStatus)
  }, [fetchCosts])

  const addCostCB = useCallback(addCost.bind(null, transactionsStatus), [addCost])
  const deleteCostCB = useCallback(deleteCost.bind(null, transactionsStatus), [deleteCost])

  return (
    <Costs
      isFetching={isFetching}
      addCost={addCostCB}
      deleteCost={deleteCostCB}
      deleting={deleting}
      costs={costs}
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
      costs: getPlannedCosts(state),
      deleting: state[moduleName][transactionsStatus].deleting,
      categories: getCostCategories(state),
      accounts: getAccountsWhithPlannedBalance(state),
      isSubmit: state[moduleName][transactionsStatus].isSubmit,
      config: state[moduleName][transactionsStatus].config,
    }),
    dispatch => ({
      fetchCosts: (part) => dispatch(fetchCosts(part)),
      addCost: (transactionsStatus, cost) => dispatch(addCost(transactionsStatus, cost)),
      deleteCost: (transactionsStatus, id) => dispatch(deleteCost(transactionsStatus, id))
    })
  ),
   withError,
)(PlannedCosts)
