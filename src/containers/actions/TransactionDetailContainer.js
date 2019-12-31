import React from 'react'
import { connect } from 'react-redux'
import TransactionInfo from '../../components/Common/TransactionInfo'
import { isVisible, handleOk, handleCancel, getTransaction, commit, bind, skip, closeDetail } from './actions'


function TransactionDetailContainer({
  visible,
  closeDetail,
  transaction,
  commit,
  bind,
  skip,
}) {
  return (
    <TransactionInfo
      visible={visible}
      handleOk={closeDetail}
      handleCancel={closeDetail}
      transaction={transaction}
      commit={commit}
      bind={bind}
      skip={skip}
    />
  )
}

export default connect(
  state => ({
    visible: isVisible(state),
    transaction: getTransaction(state),
  }),
  dispatch => ({
    closeDetail: () => dispatch(closeDetail()),
    commit: (transaction, target) => dispatch(commit(transaction, target)),
    bind: (originID, targetID, target) => dispatch(bind(originID, targetID, target)),
    skip: (transactionID, date, target) => dispatch(skip(transactionID, date, target)),
  }),
)(TransactionDetailContainer)
