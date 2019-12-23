import React from 'react'
import { Card } from 'antd'
import AddTransactionForm from '../Common/AddTransactionForm'

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
      className="incomes"
      loading={isFetching}
      title="Доходы"
      extra={
        <AddTransactionForm
          className="income"
          isSubmit={isSubmit}
          categories={categories}
          accounts={accounts}
          handleAdd={addIncome}
          isFetching={isFetching}
          type="income"
        />
      }
      className={styles.incomes}
    >
      <List isFetching={isFetching} items={incomes} categories={categories} type="income"/>
    </Card>
  )
}

export default Incomes
