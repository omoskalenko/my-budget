import React from 'react'
import { Card } from 'antd'
import AddForm from '../Common/AddForm'

import styles from './incomes.module.sass'
import List from '../Common/List'

function Incomes({
  isFetching,
  addIncome,
  incomes,
  categories,
  accounts,
  isSubmit
}) {
  return (
    <Card
      loading={isFetching}
      title="Доходы"
      extra={
        <AddForm
          isSubmit={isSubmit}
          categories={categories}
          accounts={accounts}
          addIncome={addIncome}
          isFetching={isFetching}
        />
      }
      className={styles.incomes}
    >
      <List isFetching={isFetching} items={incomes} categories={categories} />
    </Card>
  )
}

export default Incomes
