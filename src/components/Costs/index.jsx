import React from 'react'
import { Card } from 'antd'
import AddForm from '../Common/AddTransactionForm'

import styles from './costs.module.sass'
import List from '../Common/List'

function Costs({
  isFetching,
  addCost,
  deleteCost,
  deleting,
  costs,
  categories,
  accounts,
  isSubmit,
  config,
}) {
  return (
    <Card
      className="costs"
      size="small"
      style={{
        height: '100%'
      }}
      loading={isFetching}
      title="Расходы"
      extra={
        <AddForm
          className="cost"
          isSubmit={isSubmit}
          categories={categories}
          accounts={accounts}
          handleAdd={addCost}
          isFetching={isFetching}
          config={config}
        />
      }
    >
      <List deleting={deleting} isFetching={isFetching} handleDelete={deleteCost} items={costs} categories={categories}  config={config}/>
    </Card>
  )
}

export default Costs
