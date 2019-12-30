import React from 'react'
import { connect } from 'react-redux'
import TransactionInfo from '../../components/Common/TransactionInfo'
import { isVisible, handleOk, handleCancel, getTransaction } from './actions'


function TransactionDetailContainer({
  visible,
  handleOk,
  handleCancel,
  transaction,
}) {
  return (
    <TransactionInfo
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      transaction={transaction}
    />
  )
}

export default connect(
state => ({
  visible: isVisible(state),
  transaction: getTransaction(state),
}),
dispatch => ({
  handleOk: () => dispatch(handleOk()),
  handleCancel: () => dispatch(handleCancel())
}),
)(TransactionDetailContainer)
