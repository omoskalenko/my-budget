import { Layout, Avatar, DatePicker, Row, Col } from "antd";
import React from "react"
import moment from 'moment'

import "./styles.sass";

moment.locale('ru');

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
            <RangePicker
              defaultValue={[moment('22.12.2019', 'DD.MM.YYYY'), moment('25.12.2019', 'DD.MM.YYYY')]}
              defaultPickerValue={[moment('22.12.2019', 'DD.MM.YYYY'), moment('25.12.2019', 'DD.MM.YYYY')]}
              size="large"
              format="DD.MM.YYYY"
              onCalendarChange={dates => console.log(dates)}
            />
        </Col>
        <Col offset={7} span={1}>
          <Avatar className="header_user__avatar" icon="user" />
        </Col>
      </Row>
    </Header>
  );
}
