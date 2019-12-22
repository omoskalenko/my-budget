import React from 'react'
import HeaderBlock from '../../components/Blocks/Header'
import Accounts from '../../containers/accounts/AccountsContainer'
import Costs from '../../containers/costs/CostsContainer'
import { Layout } from 'antd'

const { Content, Footer } = Layout

export default function Main() {
  return (
    <Layout id="main">
    <HeaderBlock/>

    <Content style={{ margin: '20px 16px' }}>
      <Accounts />
      <Costs />
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2019 Created by Oleg Moskalenko</Footer>
  </Layout>
  )
}
