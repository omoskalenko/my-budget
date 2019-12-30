import React from 'react'
import { Card } from 'antd'
import AddTransactionForm from '../Common/AddTransactionForm'

import List from '../Common/List'

function Incomes({
  isFetching,
  addIncome,
  deleteIncome,
  deleting,
  incomes,
  categories,
  accounts,
  showDetail,
  isSubmit,
  config,
}) {
  return (
    <Card
      className="incomes"
      size="small"
      loading={isFetching}
      title="Доходы"
      style={{
        height: '100%'
      }}
      extra={
        <AddTransactionForm
          className="income"
          isSubmit={isSubmit}
          categories={categories}
          accounts={accounts}
          handleAdd={addIncome}
          isFetching={isFetching}
          config={config}
        />
      }
    >
      <List
        deleting={deleting}
        isFetching={isFetching}
        handleDelete={deleteIncome}
        items={incomes}
        categories={categories}
        showDetail={showDetail}
        config={config}
      />
   </Card>
  )
}

export default Incomes
