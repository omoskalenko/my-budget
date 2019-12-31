import React from 'react';
import { Modal, Card, Descriptions, Button } from 'antd';

const TransactionInfo = ({
  visible,
  handleOk,
  handleCancel,
  transaction,
  commit,
  bind,
  skip,
  isFetching,
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
      <Button type="primary" loading={isFetching} onClick={() => commit()}>Провести операцию</Button>
      <Button type="primary" loading={isFetching} onClick={() => skip()}>Пропустить операцию</Button>
      <Button type="primary" loading={isFetching} onClick={() => bind()}>Привязать существующую операцию</Button>
    </Modal>
  );
}

export default TransactionInfo;
