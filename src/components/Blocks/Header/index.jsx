import { Layout, Avatar, DatePicker, Row, Col } from "antd";

import React from "react";

import { DATE_LOCAL} from  '../../../config'

import "./styles.sass";

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock() {
  return (
    <Header id="header">
      {/* <span className="header-trigger">
        <Icon
          style={{ fontSize: "20px" }}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={toggle}
        />
      </span> */}
      <Row>
        <Col offset={1} span={15}>
          <RangePicker size="large" format="DD.MM.YYYY" locale={DATE_LOCAL}/>
        </Col>
        <Col offset={7} span={1}>
          <Avatar className="header_user__avatar" icon="user" />
        </Col>
      </Row>
    </Header>
  );
}
