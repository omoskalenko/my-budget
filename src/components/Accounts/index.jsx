import React from "react";
import { Card, Icon, Statistic, Row, Col } from "antd";


function Accounts({ isFetching, accounts }) {
  return (
    <Card
      loading={isFetching}
      title="Счета"
      size="small"
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />
      ]}
      className="accounts"
    >
      <Row type="flex" justify="space-around" gutter={16}>
        {!isFetching && accounts.map(({ id, title, balance }) => (
           <Statistic
           key={id}
           title={title}
           value={balance}
           precision={2}
           valueStyle={{ color: "#3f8600" }}
           prefix={<Icon type="wallet" />}
           suffix="₽"
         />
        ))}
      </Row>
    </Card>
  );
}

export default Accounts
