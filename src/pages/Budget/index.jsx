import React from "react";
import { compose } from "redux";
import Accounts from "../../containers/balance/PlannedBalanceContainer";
import Costs from "../../containers/costs/PlannedCosts";
import Incomes from "../../containers/incomes/PlannedIncomes";
import { Layout, Row, Col } from "antd";

import { connect } from "react-redux";

import { addIncome, deleteIncome, getPlannedIncomes, getPlannedIncomesNext } from "../../containers/incomes";
import { getAccountsWithPlannedBalance, getAccountsWithPlannedBalanceNext } from "../../containers/balance";
import { getPlannedCosts, getPlannedCostsNext } from "../../containers/costs/costs";
import { getPeriod, getNextPeriod } from "../../containers/parameters";
import { showDetail } from '../../containers/actions'

const { Content } = Layout

function Budget({ incomes, nextIncomes, costs, nextCosts, accounts, nextAccounts, period, nextPeriod, showDetail }) {
  return (
    <Content style={{ margin: "20px 16px", overflowY: "scroll", overflowX: "hidden" }}>
      <Row type="flex" gutter={[5, 20]}>
    <Col span={12}>
      <Accounts accounts={accounts}/>
    </Col>
    <Col span={12}>
      <Accounts accounts={nextAccounts}/>
    </Col>
  </Row>
  <Row type="flex" gutter={[5, 20]}>
    <Col span={12}>
    <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', padding: '10px', background: '#fff'}}>
          {period.length === 2 && <h3 style={{ margin: 0}}>{`${period[0].format('DD.MM.YYYY')} - ${period[1].format('DD.MM.YYYY')}`}</h3>}
      </div>
    </Col>
    <Col span={12}>
      <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', padding: '10px', background: '#fff'}}>
          {period.length === 2 && <h3 style={{ margin: 0}}>{`${nextPeriod[0].format('DD.MM.YYYY')} - ${nextPeriod[1].format('DD.MM.YYYY')}`}</h3>}
      </div>
    </Col>
  </Row>

  <Row type="flex" justify="space-between" gutter={[5, 20]}>
    <Col span={6}>
      <Costs costs={costs} accounts={accounts} showDetail={showDetail}/>
    </Col>
    <Col span={6}>
      <Incomes
        incomes={incomes}
        accounts={accounts}
        showDetail={showDetail}
      />
    </Col>
    <Col span={6}>
      <Costs costs={nextCosts} accounts={nextAccounts} showDetail={showDetail}/>
    </Col>
    <Col span={6}>
      <Incomes
        incomes={nextIncomes}
        accounts={nextAccounts}
        showDetail={showDetail}
      />
    </Col>
  </Row>
    </Content>
  );
}

export default compose(
  connect(
    state => ({
      period: getPeriod(state),
      nextPeriod: getNextPeriod(state),
      incomes: getPlannedIncomes(state),
      nextIncomes: getPlannedIncomesNext(state),
      costs: getPlannedCosts(state),
      nextCosts: getPlannedCostsNext(state),
      accounts: getAccountsWithPlannedBalance(state),
      nextAccounts: getAccountsWithPlannedBalanceNext(state)
    }),
    dispatch => ({
      addIncome: (transactionsStatus, income) => dispatch(addIncome(transactionsStatus, income)),
      deleteIncome: (transactionsStatus, id) => dispatch(deleteIncome(transactionsStatus, id)),
      showDetail: (transaction, config) => dispatch(showDetail(transaction, config))
    })
  )
  //  withError,
)(Budget);



       /* <Row type="flex" gutter={[5, 20]}>
      <Col span={12}>
        <Row  gutter={[5, 20]}>
          <Accounts accounts={accounts} />
        </Row>
        <Row gutter={[5, 20]}>
          <Card period={period} />
        </Row>
        <Row gutter={[5, 20]}>
          <Col span={12}>
            <Costs costs={costs} />
          </Col>
          <Col span={12}>
            <Incomes incomes={incomes} accounts={accounts} />
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[5, 20]}>
          <Accounts accounts={nextAccounts} />
        </Row>
        <Row  gutter={[5, 20]}>
          <Card period={nextPeriod} />
        </Row>
        <Row gutter={[5, 20]}>
          <Col span={12}>
            <Costs costs={nextCosts} />
          </Col>
          <Col span={12}>
            <Incomes incomes={nextIncomes} accounts={accounts} />
          </Col>
        </Row>
      </Col>
      </Row> */
