import React, { useState } from 'react'
import { Menu, Layout, Icon } from 'antd'

import './styles.sass'

const { SubMenu } = Menu
const { Sider } = Layout

export default function SiderBlock() {

  const [collapsed, setCollapsed] = useState([])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider id="side" onCollapse={toggle} collapsible collapsed={collapsed}>
    <div className="logo" ></div>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Главная</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="desktop" />
        <span>Отчет за период</span>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            <span>Справочники</span>
          </span>
        }
      >
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="team" />
            <span>Владельцы</span>
          </span>
        }
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>Настройки</span>
      </Menu.Item>
    </Menu>
  </Sider>
  )
}
