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
