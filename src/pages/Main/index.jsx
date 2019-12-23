import React from "react";
import HeaderBlock from "../../components/Blocks/Header";
import Accounts from "../../containers/accounts/AccountsContainer";
import Costs from "../../containers/costs/CostsContainer";
import Incomes from "../../containers/incomes/IncomesContainer";
import { Layout, Row, Col } from "antd";

import "./styles.sass";

const { Content, Footer } = Layout;

export default function Main() {
  return (
    <Layout id="main">
      <HeaderBlock />

      <Content style={{ margin: "20px 16px", overflowY: "scroll" }}>
        <Row type="flex" gutter={[10, 20]}>
          <Col span={12}>
            <Accounts />
          </Col>
        </Row>

        <Row type="flex" justify="space-between" gutter={[10, 20]}>
          <Col span={12}>
            <Costs />
          </Col>
          <Col span={12}>
            <Incomes />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2019 Created by Oleg Moskalenko</Footer>
    </Layout>
  );
}
