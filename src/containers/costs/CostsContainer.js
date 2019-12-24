import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Costs from '../../components/Costs'
import { connect } from 'react-redux'

import { fetchCosts, addCost, deleteCost, getCosts, moduleName } from './costs'
import { getCostCategories } from '../directores'
import { getAccounts } from '../accounts'

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
    fetchCosts()
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
      isFetching: state[moduleName].isFetching,
      costs: getCosts(state),
      deleting: state[moduleName].deleting,
      categories: getCostCategories(state),
      accounts: getAccounts(state),
      isSubmit: state[moduleName].isSubmit
    }),
    dispatch => ({
      fetchCosts: () => dispatch(fetchCosts()),
      addCost: cost => dispatch(addCost(cost)),
      deleteCost: id => dispatch(deleteCost(id))
    })
  ),
   withError,
)(CostsContainer)
