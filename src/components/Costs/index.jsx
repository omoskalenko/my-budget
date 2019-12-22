import React, { Fragment } from 'react'
import { Empty, Card, Table, Typography  } from 'antd'
import AddCost from './AddCost'
import moment from 'moment'

import styles from './costs.module.sass'

const { Title } = Typography

function Costs({
  isFetching,
  addCost,
  costs,
  categories,
  isSubmit
}) {

  const renderCosts = (id) => {
    const dataSource = costs
      .filter(cost => String(cost.category.id) === String(id))
      .map(({
        id, committed, name, amount
      }) => ({
        key: id,
        committed: moment(committed).format('DD.MM.YYYY'),
        name,
        amount,
      }))
    const columns = [
      {
        title: 'Дата',
        dataIndex: 'committed',
        key: 'committed',
      },
      {
        title: 'Расход',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
      },
    ]
    return <Table size="small" dataSource={dataSource} columns={columns} />;
  }

  const renderCategories = () => {
    if (costs.length === 0) return <Empty />
    
    return categories.map(category => {
      const catigoryCosts = costs.filter(cost => String(category.id) === String(cost.category.id))
      if (catigoryCosts.length === 0) return null 
      return <div key={category.id}>
      <Title level={4}>{category.title}</Title>
      {renderCosts(category.id)}
      </div>
    })
  }

  return (
    <Card
      loading={isFetching}
      title="Расходы"
      extra={<AddCost isSubmit={isSubmit} categories={categories} addCost={addCost} isFetching={isFetching} />}
      className={styles.costs}
    >
      {!isFetching && renderCategories()}
    </Card>
  )
}

export default Costs
