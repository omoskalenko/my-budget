import React, { useEffect, useState } from 'react'
import { getAllData } from './API'
import moment from 'moment'
import { Layout } from 'antd'

import Sider from './components/Blocks/Sider'
import HeaderBlock from './components/Blocks/Header'

import './styles.sass'
import Accounts from './components/Blocks/Accounts'

const { Content, Footer } = Layout

const period = {
  startDate: moment('07.12.2019', 'DD.MM.YYYY'),
  endDate: moment('14.12.2019', 'DD.MM.YYYY'),
  startDay() { return this.startDate.get('date') },
  endDay() { return this.endDate.get('date') },
  days() { return this.endDay() - this.startDay() },
}

console.log(period.days())


/**
* Преобразование объекта с данными по id в массив объектов с свойством id
*
* @returns {@array}
*/
function normalize(object) {
  return Object.entries(object).map(item => ({ id: item[0], ...item[1] }))
}

/**
* Получить сумму транзакций по id транзакций
*
* @returns {@number} - сумма транзакций
*/
export function getAmountByIdsTransactions(transactionIds, transactions) {
  return transactionIds.reduce((res, op) => res + transactions[op].amount, 0)
}

/**
* Получить сумму транзакций по id счета
*
* @returns {@number} - сумма транзакций
*/
function getAmountByIdAccount(account, transactions) {
  return (normalize(transactions)
    .filter(transaction => transaction.account === +account)
    .reduce((res, transaction) => res + transaction.amount, 0))
}

function App() {
  const [isFetching, setFetching] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [incomePerfect, setIncomePerfect] = useState([])
  const [costsPerfect, setCostsPerfect] = useState([])
  const [collapsed, setCollapsed] = useState([])

  useEffect(() => {
    setFetching(true)
    getAllData().then((data) => {
      const {
        accounts,
        income,
        costs
      } = data
      console.log(data)
      setAccounts(accounts)
      setIncomePerfect(income.perfect)
      setCostsPerfect(costs.perfect)

      setFetching(false)
    })
  }, [])

  const toggle = () => {
    setCollapsed(!collapsed)
  }


  const renderAccounts = () => {
    return normalize(accounts).map(account => {
      const { id, title } = account
      return (
        <li key={id}>{title} {getBalance(id)}</li>
      )
    })
  }

  const renderIncomeList = () => {
    return normalize(incomePerfect).map(income => {
      const { id, title, committed, amount } = income
      return (
        <li key={id}>{committed} {title} {amount}</li>
      )
    })
  }


  /**
  * Получить входящие зачисления на счет
  *
  * @param {number} - accountId - id счета
  * @param {object} - income - Коллекция транзакции доходов
  * @returns {number} - сумму зачислений за все время
  */
  const getIncoming = (accountId, income) => {
    // return  getAmountByIdsTransactions(accounts[accountId].transactions.income, income)
    return getAmountByIdAccount(accountId, income)
  }

  /**
  * Получить расходы с счета
  *
  * @param {number} - accountId - id счета
  * @param {object} - costs - Коллекция транзакции расходов
  * @returns {@number} - сумму зачислений за все время
  */
  const getCoasts = (accountId, costs) => {
    // return getAmountByIdsTransactions(accounts[accountId].transactions.costs, costs)
    return getAmountByIdAccount(accountId, costs)
  }


  // Получить баланс счета по id счета
  const getBalance = (accountId) => {
    return getIncoming(accountId, incomePerfect) - getCoasts(accountId, costsPerfect)
  }

















  if (isFetching) return <h1>Загрузка...</h1>

  return (
    <Layout style={{ minHeight: '100vh' }}>
       <Sider collapsed={collapsed}/>
      <Layout>
        <HeaderBlock collapsed={collapsed} toggle={toggle} />

        <Content style={{ margin: '20px 16px' }}>
          <Accounts data={renderAccounts()}/>

          {renderIncomeList()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default App
