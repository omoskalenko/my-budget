import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Costs from '../../components/Costs'
import { connect } from 'react-redux'

import { fetchCosts, addCost, deleteCost, getPlannedCosts, moduleName } from './costs'
import { getCostCategories } from '../directores'
import { getAccounts } from '../accounts'

const transactionsType = 'planned'

function CostsContainer({
  isFetching,
  fetchCosts,
  addCost,
  deleteCost,
  deleting,
  costs,
  categories,
  accounts,
  isSubmit
}) {
  useEffect(() => {
    fetchCosts(transactionsType)
  }, [fetchCosts])
  return (
    <Costs
      isFetching={isFetching}
      addCost={addCost}
      deleteCost={deleteCost}
      deleting={deleting}
      costs={costs}
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
      costs: getPlannedCosts(state),
      deleting: state[moduleName][transactionsType].deleting,
      categories: getCostCategories(state),
      accounts: getAccounts(state),
      isSubmit: state[moduleName][transactionsType].isSubmit
    }),
    dispatch => ({
      fetchCosts: (part) => dispatch(fetchCosts(part)),
      addCost: (transactionsType, cost) => dispatch(addCost(transactionsType, cost)),
      deleteCost: (transactionsType, id) => dispatch(deleteCost(transactionsType, id))
    })
  ),
   withError,
)(CostsContainer)
