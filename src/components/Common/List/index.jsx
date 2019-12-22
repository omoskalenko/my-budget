import React from 'react'
// import PropTypes from 'prop-types'
import { Empty, Table, Typography  } from 'antd'

const { Title } = Typography

function List({
  isFetching,
  items,
  categories,
}) {

  const renderItems = (id) => {
    const dataSource = items
      .filter(item => String(item.category.id) === String(id))
      .map(({
        id, committed, name, amount
      }) => ({
        key: id,
        committed,
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
    if (items.length === 0) return <Empty />
    
    return categories.map(category => {
      const catigoryItems = items.filter(item => String(category.id) === String(item.category.id))
      if (catigoryItems.length === 0) return null 
      return <div key={category.id}>
      <Title level={4}>{category.title}</Title>
      {renderItems(category.id)}
      </div>
    })
  }

  return (
    <div>
      {!isFetching && renderCategories()}
    </div>
  )
}

List.propTypes = {

}

export default List

