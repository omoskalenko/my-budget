import React from 'react'
import HeaderBlock from '../../components/Blocks/Header'
import Accounts from '../../containers/accounts/AccountsContainer'
import Costs from '../../containers/costs/CostsContainer'
import Incomes from '../../containers/incomes/IncomesContainer'
import { Layout } from 'antd'

import './styles.sass'

const { Content, Footer } = Layout

export default function Main() {
  return (
    <Layout id="main">
    <HeaderBlock/>

    <Content style={{ margin: '20px 16px', overflowY: 'scroll' }}>
      <Accounts />
      <div className="list_container">
      <Costs />
      <Incomes />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2019 Created by Oleg Moskalenko</Footer>
  </Layout>
  )
}
