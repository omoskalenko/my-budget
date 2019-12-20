import React from 'react'
import HeaderBlock from '../../components/Blocks/Header'
import Accounts from '../../components/Blocks/Accounts'
import { Layout } from 'antd'

const { Content, Footer } = Layout

export default function Main({
  isFetching,
  accounts,
}) {
  return (
    <Layout id="main">
    <HeaderBlock/>

    <Content style={{ margin: '20px 16px' }}>
      <Accounts isFetching={isFetching} accounts={accounts} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2019 Created by Oleg Moskalenko</Footer>
  </Layout>
  )
}
