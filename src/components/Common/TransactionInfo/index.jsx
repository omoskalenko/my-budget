import React from 'react';
import { Modal, Card, Descriptions } from 'antd';

const TransactionInfo = ({
  visible,
  handleOk,
  handleCancel,
  transaction,
}) => {
  return (
    <Modal
      title="Детали опарации"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Descriptions>
        {Object.keys(transaction).map(prop => <Descriptions.Item label={prop}>{typeof transaction[prop] === 'object' ? '' : transaction[prop]}</Descriptions.Item>)}
      </Descriptions>
    </Modal>
  );
}

export default TransactionInfo;
