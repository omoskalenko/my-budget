import React from 'react'
import { Card } from 'antd'
import AddTransactionForm from '../Common/AddTransactionForm'

import List from '../Common/List'

function Incomes({
  isFetching,
  addIncome,
  deleteIncome,
  incomes,
  categories,
  accounts,
  isSubmit
}) {
  return (
    <Card
      className="incomes"
      size="small"
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
    >
      <List isFetching={isFetching} handleDelete={deleteIncome} items={incomes} categories={categories} type="income"/>
    </Card>
  )
}

export default Incomes
