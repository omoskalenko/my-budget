import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { Layout } from 'antd'

import Sider from './components/Blocks/Sider'
import Main from './pages/Main'
import Budget from './pages/Budget'
import HeaderBlock from "./containers/parameters/HeaderContainer";
import { fetchDirectories, moduleName } from './containers/directores'

import './styles/styles.sass'
import TransactionDetailContainer from './containers/actions/TransactionDetailContainer'

const { Footer } = Layout;

function App({
  fetchDirectories,
  isFetching,
}) {
  useEffect(() => {
    fetchDirectories()
  }, [fetchDirectories])

  if (isFetching) return <h1>Загрузка...</h1>

  return (
    <>
    <Layout style={{ maxHeight: '100vh', minHeight: '100vh' }}>
      <Sider />
      <Layout id="main">
        <HeaderBlock />
        <Switch>
          <Route exact path='/operations' component={Main} />
          <Route exact path='/budget' component={Budget} />
        </Switch>
        <Footer style={{ textAlign: "center" }}>©2019 Created by Oleg Moskalenko</Footer>
      </Layout>
    </Layout>
    <TransactionDetailContainer />
    </>
  )
}

export default connect(
  state => ({
    isFetching: state[moduleName].isFetching
  }),
  dispatch => ({
    fetchDirectories: () => dispatch(fetchDirectories())
  })
)(App)
