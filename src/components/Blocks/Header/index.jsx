import { Layout, Avatar, DatePicker, Row, Col, Radio } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";

import "./styles.sass";

moment.locale("ru");

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock({ handleChange, dates }) {
  return (
    <Header id="header">
      <Row>
        <Col offset={1} span={8}>
          <RangePicker
            defaultValue={dates}
            // defaultPickerValue={dates}
            size="large"
            format="DD.MM.YYYY"
            onCalendarChange={handleChange}
          />
          
        </Col>
        <Col  span={8}>
        <div>
            <Radio.Group onChange={e => handleChange(e.target.value)} defaultValue="a">
              <Radio.Button value={[moment(), moment()]}>День</Radio.Button>
              <Radio.Button value={[moment().date(1), moment().date(31)]}>Месяц</Radio.Button>
              <Radio.Button value={[moment().month(0).date(1), moment().month(12).date(31)]}>Год</Radio.Button>
            </Radio.Group>
          </div>
        </Col>
        <Col offset={6} span={1}>
          <Avatar className="header_user__avatar" icon="user" />
        </Col>
      </Row>
    </Header>
  );
}
