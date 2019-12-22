import React, { useEffect } from 'react'
import { compose } from 'redux'
import withError from '../../HOC/withError'
import Costs from '../../components/Costs'
import { connect } from 'react-redux'

import { fetchCosts, addCost, getCosts, moduleName } from './costs'
import { getCostCategories } from '../directores'

function CostsContainer({
  isFetching,
  fetchCosts,
  addCost,
  costs,
  categories,
  isSubmit
}) {
  useEffect(() => {
    fetchCosts()
  }, [fetchCosts])
  return (
    <Costs
      isFetching={isFetching}
      addCost={addCost}
      costs={costs}
      categories={categories}
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
      isSubmit: state[moduleName].isSubmit
    }),
    dispatch => ({
      fetchCosts: () => dispatch(fetchCosts()),
      addCost: cost => dispatch(addCost(cost))
    })
  ),
   withError,
)(CostsContainer)
