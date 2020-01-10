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
  target
}) => {
  const renderPlannedInfo = () => {
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
        <Button type="primary" loading={isFetching} onClick={() => bind()}>Привязать операцию</Button>
      </Modal>
    );
  }
  const renderCommitedInfo = () => {
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
        <Button type="danger" loading={isFetching} onClick={() => skip()}>Удалить операцию</Button>
        <Button type="primary" loading={isFetching} onClick={() => bind()}>Привязать операцию</Button>
      </Modal>
    );
  }

  if (target.status === 'planned') return renderPlannedInfo()
  if (target.status === 'committed') return renderCommitedInfo()
  return <></>
}

export default TransactionInfo;
