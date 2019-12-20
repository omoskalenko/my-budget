import React from 'react'

import moment from 'moment'
import { Route } from 'react-router'
import { Layout } from 'antd'

import Sider from './components/Blocks/Sider'
import MainContainer from './containers/main'

import './styles.sass'



const period = {
  startDate: moment('07.12.2019', 'DD.MM.YYYY'),
  endDate: moment('14.12.2019', 'DD.MM.YYYY'),
  startDay() { return this.startDate.get('date') },
  endDay() { return this.endDate.get('date') },
  days() { return this.endDay() - this.startDay() },
}

console.log(period.days())




function App({
  isFetching,
}) {


  if (isFetching) return <h1>Загрузка...</h1>

  return (
    <Layout style={{ minHeight: '100vh' }}>
       <Sider />
        <Route exact path='/' component={MainContainer}/>
    </Layout>
  )
}

export default App
