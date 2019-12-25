import React from 'react'
// import PropTypes from 'prop-types'
import { Empty, Table, Typography, Icon  } from 'antd'

import styles from './list.module.sass'

const { Title } = Typography

function List({
  isFetching,
  items,
  handleDelete,
  deleting,
  categories,
  config,
}) {

  const renderItems = (id) => {
    const dataSource = items
      .filter(item => String(item.category.id) === String(id))
      .map(({
        id, displayDate, name, amount
      }) => ({
        id,
        key: id,
        committed: displayDate,
        name,
        amount,
      }))
    let columns = [
      {
        title: 'Дата',
        dataIndex: 'committed',
        key: 'committed',
        width: '100px',
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
        className: config.type === 'costs' ? styles.amountCostCol : styles.amountCol,
        width: '100px',
      },
      {
        dataIndex: 'delete',
        key: 'delete',
        render: (_, record) => <Icon type={deleting[record.id] ? "loading" : "delete"} onClick={() => handleDelete(record.id) }/>,
        width: '50px',
        className: styles.delete
      }
    ]
    // if((config.type === 'costs') !== 'cost') columns = columns.filter(column => column.dataIndex !== 'name')
    return (
      <Table
        loading={isFetching}
        style={{
          border: 'none !important'
        }}
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        onRow={(record, rowIndex) => {
          return {
            style: {
              cursor: 'pointer'
            },
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => { }, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />)
  }

  const renderCategories = () => {
    if (items.length === 0) return <Empty />
    return categories.map(category => {
      const catigoryItems = items.filter(item => String(category.id) === String(item.category.id))
      if (catigoryItems.length === 0) return null 
      return <div className={styles.transactionsBlock} key={category.id}>
      <b style={{ color: '#333', fontSize: '16px'}}>{category.title}</b>
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

List.defaultProps = {
  config: {
    type: '',
    status: '',
  }
}

List.propTypes = {

}

export default List

