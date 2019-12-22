import React from "react";
import { Card, Icon, Statistic, Row, Col } from "antd";


function Accounts({ isFetching, accounts }) {
  return (
    <Card
      loading={isFetching}
      style={{
        width: '50%',
        margin: '10px 10px'
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

export default Accounts
