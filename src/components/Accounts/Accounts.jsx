import React from "react";
import { Card, Icon, Statistic, Row } from "antd";
import isEmpty from "../../HOC/isEmpty";


export function Accounts({ isFetching, accounts }) {

  const renderAccount = ({ id, title, balance }) => (
    <Statistic
    key={id}
    title={title}
    value={balance}
    precision={2}
    valueStyle={{ color: "#3f8600" }}
    prefix={<Icon type="wallet" />}
    suffix="₽"
  />
 )

  return (
    <Card
      loading={isFetching}
      title="Остаток"
      size="small"
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />
      ]}
      className="accounts"
    >
      <Row type="flex" justify="space-around" gutter={16}>
        {!isFetching && isEmpty(accounts, renderAccount)}
      </Row>
    </Card>
  );
}
