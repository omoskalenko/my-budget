import { Layout, Avatar, DatePicker, Row, Col } from "antd";
import React, { useState, useEffect } from "react"
import moment from 'moment'

import "./styles.sass";

moment.locale('ru');

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock({
  handleChange,
  dates
}) {

  return (
    <Header id="header">
      <Row>
        <Col offset={1} span={15}>
            <RangePicker
              defaultValue={dates}
              // defaultPickerValue={dates}
              size="large"
              format="DD.MM.YYYY"
              onCalendarChange={handleChange}
            />
        </Col>
        <Col offset={7} span={1}>
          <Avatar className="header_user__avatar" icon="user" />
        </Col>
      </Row>
    </Header>
  );
}
