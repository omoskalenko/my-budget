import React from "react";

import Accounts from "../../containers/accounts/AccountsContainer";
import Costs from "../../containers/costs/CostsContainer";
import Incomes from "../../containers/incomes/IncomesContainer";
import { Layout, Row, Col } from "antd";

import "./styles.sass";

const { Content } = Layout;

export default function Budget() {
  return (<Content style={{ margin: "20px 16px", overflowY: "scroll", overflowX: "hidden" }}>
  <Row type="flex" gutter={[5, 20]}>
    <Col span={12}>
      <Accounts />
    </Col>
  </Row>

  <Row type="flex" justify="space-between" gutter={[5, 20]}>
    <Col span={12}>
      <Costs />
    </Col>
    <Col span={12}>
      <Incomes />
    </Col>
  </Row>
</Content>
  );
}
