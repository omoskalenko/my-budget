import React from "react";
import { Card, Icon, Statistic, Row, Col } from "antd";
import withError from '../../../HOC/withError/index'

function Accounts({ isFetching, accounts }) {
  console.log( isFetching, accounts);
  
  return (
    <Card
      loading={isFetching}
      style={{
        width: '50%'
      }}
      title="Счета"
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />
      ]}
    >
      <Row gutter={16}>
        {!isFetching && accounts.map(({ id, title, balance }) => (
          <Col span={8} key={id}>
            <Statistic
              title={title}
              value={balance}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<Icon type="wallet" />}
              suffix="₽"
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default withError(Accounts)
