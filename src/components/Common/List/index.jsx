import React from 'react'
// import PropTypes from 'prop-types'
import { Empty, Table, Icon  } from 'antd'

import styles from './list.module.sass'
import isEmpty from '../../../HOC/isEmpty'

function List({
  isFetching,
  items,
  handleDelete,
  deleting,
  categories,
  config,
}) {

  if (items.length === 0) return <Empty />

  const renderItems = (id) => {
    const dataSource = items
      .filter(item => String(item.category.id) === String(id))
      .map(({
        id, displayDate, name, amount, key, isCommit
      }) => ({
        id,
        key,
        committed: displayDate,
        name,
        amount,
        isCommit,
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
              cursor: 'pointer',
              background: record.isCommit ? '#d7ffd9' : 'none'

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

  const renderItemsByCategory = category => {
    const catigoryItems = items.filter(item => String(category.id) === String(item.category.id))
    if (catigoryItems.length === 0) return null 
    return <div className={styles.transactionsBlock} key={category.id}>
    <b style={{ color: '#333', fontSize: '16px'}}>{category.title}</b>
    {renderItems(category.id)}
    </div>
  }

  return (
    <div>
      {!isFetching && isEmpty(categories, renderItemsByCategory)}
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

