import React from 'react'
import { connect } from 'react-redux'
import TransactionInfo from '../../components/Common/TransactionInfo'
import { isVisible, handleOk, handleCancel, getTransaction, commit, bind, skip, closeDetail, moduleName } from './actions'

function TransactionDetailContainer({
  visible,
  closeDetail,
  transaction,
  commit,
  bind,
  skip,
  target,
  isCommitted,
  isSkipped,
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
      target={target}
      isCommitted={isCommitted}
      isSkipped={isSkipped}
    />
  )
}

export default connect(
  state => ({
    isCommitted: state[moduleName]?.isCommitted,
    isSkipped: state[moduleName]?.isSkipped,
    visible: isVisible(state),
    transaction: getTransaction(state),
    target: state[moduleName]?.target,
  }),
  dispatch => ({
    closeDetail: () => dispatch(closeDetail()),
    commit: (transaction, target) => dispatch(commit(transaction, target)),
    bind: (originID, targetID, target) => dispatch(bind(originID, targetID, target)),
    skip: (transactionID, date, target) => dispatch(skip(transactionID, date, target)),
  }),
)(TransactionDetailContainer)
