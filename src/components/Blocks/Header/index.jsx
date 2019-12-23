import { Layout, Avatar, DatePicker, Row, Col, Radio } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";

import "./styles.sass";

moment.locale("ru");

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock({ handleChange, dates }) {
  const [period, setPeriod] = useState('month')
  const periods = {
    day: [moment(), moment()],
    month: [moment().date(1), moment().date(31)],
    years: [moment().month(0).date(1), moment().month(11).date(31)]
  }
  const onChange = (e) => {
    const value = e.target.value
    setPeriod(value)
  }
  useEffect(() => {
    handleChange(periods[period])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])
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
        <Col span={8}>
        <div style={{ marginLeft: '20px' }}>
            <Radio.Group onChange={onChange} defaultValue={periods[period]}>
              <Radio.Button value={'day'}>День</Radio.Button>
              <Radio.Button value={'month'}>Месяц</Radio.Button>
              <Radio.Button value={'years'}>Год</Radio.Button>
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
