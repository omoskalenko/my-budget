import React from 'react'
import { Card } from 'antd'
import AddForm from '../Common/AddTransactionForm'

import styles from './costs.module.sass'
import List from '../Common/List'

function Costs({
  isFetching,
  addCost,
  costs,
  categories,
  accounts,
  isSubmit
}) {

 

  return (
    <Card
      loading={isFetching}
      title="Расходы"
      extra={
        <AddForm
          isSubmit={isSubmit}
          categories={categories}
          accounts={accounts}
          handleAdd={addCost}
          isFetching={isFetching}
          type="cost"
        />
      }
      className={styles.costs}
    >
      <List isFetching={isFetching} items={costs} categories={categories} />
    </Card>
  )
}

export default Costs
