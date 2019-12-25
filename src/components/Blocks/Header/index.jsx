import { Layout, Avatar, DatePicker, Row, Col, Radio, Button, Icon } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";

import "./styles.sass";

moment.locale("ru");

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock({ handleChange, dates }) {
  const [period, setPeriod] = useState("month");
  const periods = {
    day: [moment(), moment()],
    month: [moment().date(1), moment().date(31)],
    years: [
      moment().startOf('year'),
      moment().endOf("year")
    ]
  };

  useEffect(() => {
    handleChange(periods[period]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const onChange = e => {
    const value = e.target.value;
    setPeriod(value);
  };

  const handleClick = e => {
    const direction = e.currentTarget.dataset.direction
    const manipulate = {
      'years': date => date[direction](1, 'year'),
      'month': date => date[direction](1, 'month'),
      'day': date => date[direction](1, 'days')
    }
    const newPeriod = dates.map(manipulate[period])

    handleChange(newPeriod);

  }
  return (
    <Header id="header">
      <Row type="flex">
        <Col offset={1} span={10}>

          <Button size="large" data-direction="subtract" onClick={handleClick}>
            <Icon type="left" />
          </Button>

          <RangePicker value={dates} allowClear={false} size="large" format="DD.MM.YYYY" onCalendarChange={handleChange} />

          <Button size="large" data-direction="add" onClick={handleClick}>
            <Icon type="right" />
          </Button>

        </Col>
        <Col span={6}>
          <div style={{ marginLeft: "20px" }}>
            <Radio.Group onChange={onChange} defaultValue={period}>
              <Radio.Button value={"day"}>День</Radio.Button>
              <Radio.Button value={"month"}>Месяц</Radio.Button>
              <Radio.Button value={"years"}>Год</Radio.Button>
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
