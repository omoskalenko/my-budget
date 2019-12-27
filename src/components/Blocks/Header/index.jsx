import { Layout, Avatar, DatePicker, Row, Radio, Button, Icon } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { DEFAULT_PERIOD, PERIODS } from '../../../config'
import "./styles.sass";

moment.locale("ru");

const { RangePicker } = DatePicker;

const { Header } = Layout;

export default function HeaderBlock({ handleChange, dates }) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);

  const onChange = e => {
    const value = e.target.value;
    setPeriod(value);
    handleChange(PERIODS[value], value);
  };

  const handleClick = e => {
    const direction = e.currentTarget.dataset.direction;
    const manipulate = {
      years: date => date[direction](1, "year"),
      month: date => date[direction](1, "month"),
      week: date => date[direction](1, "week"),
      day: date => date[direction](1, "days")
    };
    const newPeriod = dates.map(manipulate[period]);

    handleChange(newPeriod, period);
  };
  return (
    <Header id="header">
      <Row type="flex">
        <div style={{ marginLeft: "20px" }}>
          <Button size="large" data-direction="subtract" onClick={handleClick}>
            <Icon type="left" />
          </Button>

          <RangePicker value={dates} allowClear={false} size="large" format="DD.MM.YYYY" onCalendarChange={handleChange} />

          <Button size="large" data-direction="add" onClick={handleClick}>
            <Icon type="right" />
          </Button>
        </div>

        <div style={{ marginLeft: "20px" }}>
          <Radio.Group onChange={onChange} defaultValue={period}>
            <Radio.Button value={"day"}>День</Radio.Button>
            <Radio.Button value={"week"}>Неделя</Radio.Button>
            {/* <Radio.Button value={"twoWeek"}>2 Недели</Radio.Button> */}
            <Radio.Button value={"month"}>Месяц</Radio.Button>
            <Radio.Button value={"years"}>Год</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Avatar className="header_user__avatar" icon="user" />
        </div>
      </Row>
    </Header>
  );
}
