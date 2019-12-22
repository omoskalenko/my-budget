import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Layout } from 'antd'

import Sider from './components/Blocks/Sider'
import Main from './pages/Main'

import { fetchDirectories, moduleName } from './containers/directores'

import './styles.sass'

function App({
  fetchDirectories,
  isFetching,
}) {
  useEffect(() => {
    fetchDirectories()
  })

  if (isFetching) return <h1>Загрузка...</h1>

  return (
    <Layout style={{ maxHeight: '100vh', minHeight: '100vh' }}>
        <Sider />
        <Route exact path='/' component={Main}/>
    </Layout>
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
