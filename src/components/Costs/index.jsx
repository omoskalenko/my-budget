import React from 'react'
import { Card } from 'antd'
import AddForm from '../Common/AddTransactionForm'

import styles from './costs.module.sass'
import List from '../Common/List'

function Costs({
  isFetching,
  addCost,
  deleteCost,
  costs,
  categories,
  accounts,
  isSubmit,
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
          type="cost"
        />
      }
    >
      <List isFetching={isFetching} handleDelete={deleteCost} items={costs} categories={categories}  type="cost"/>
    </Card>
  )
}

export default Costs
