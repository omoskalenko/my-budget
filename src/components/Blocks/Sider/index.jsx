import React, { useState } from 'react'
import { Menu, Layout, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

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
    <div className="logo" >
    <Icon type="wallet" size="large"/><span>My Budget</span>
    </div>
    
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
      <NavLink to={'/'} activeClassName="active_link">
        <Icon type="transaction" />
        <span>Доходы и расходы</span>
       </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
      <NavLink to={'/budget'} activeClassName="active_link">
        <Icon type="pie-chart" />
        <span>Бюджет</span>
        </NavLink>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={
          <span>
           <Icon type="database" />
            <span>Справочники</span>
          </span>
        }
      >
        <Menu.Item key="3">
        <NavLink to={'/directories/costs_categories'} activeClassName="active_link">
          Категории расходов
        </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
        <NavLink to={'/directories/incomes_categories'} activeClassName="active_link">
          Категории доходов
        </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
        <NavLink to={'/directories/expenditure'} activeClassName="active_link">
          Статьи расходов
        </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
        <NavLink to={'/directories/members'} activeClassName="active_link">
          Владельцы счетов
        </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
        <NavLink to={'/directories/members'} activeClassName="active_link">
          Счета
        </NavLink>
        </Menu.Item>
      </SubMenu>
      {/* <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="team" />
            <span>Владельцы</span>
          </span>
        }
      >
        <Menu.Item key="8">Team 1</Menu.Item>
        <Menu.Item key="9">Team 2</Menu.Item>
      </SubMenu> */}
      <Menu.Item key="10">
      <Icon type="setting" />
        <span>Настройки</span>
      </Menu.Item>
    </Menu>
  </Sider>
  )
}
