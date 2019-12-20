import { Layout, Icon } from "antd";

import React from "react";

import './styles.sass'

const { Header } = Layout

export default function HeaderBlock({
  collapsed,
  toggle
}) {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <span className="header-trigger">
        <Icon
          style={{ fontSize: "20px" }}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={toggle}
        />
      </span>
    </Header>
  );
}
