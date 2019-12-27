import React from "react";
import { compose } from 'redux'
import Accounts from "../../containers/balance/PlannedBalanceContainer";
import Costs from "../../containers/costs/PlannedCosts";
import Incomes from "../../containers/incomes/PlannedIncomes";
import { Layout, Row, Col } from "antd";

import { connect } from 'react-redux'

import { addIncome, deleteIncome, getPlannedIncomes, moduleName, getPlannedIncomesNext } from '../../containers/incomes'
import { getIncomeCategories } from '../../containers/directores'
import { getAccountsWhithPlannedBalance, getAccountsWhithPlannedBalanceNext } from '../../containers/balance'
import { TRANSACTIONS_STATUSES } from '../../config'
import { getPlannedCosts, getPlannedCostsNext } from "../../containers/costs/costs";

const { Content } = Layout;

const transactionsStatus = TRANSACTIONS_STATUSES.PLANNED

function Budget({
  incomes,
  nextIncomes,
  costs,
  nextCosts,
  accounts,
  nextAccounts,
}) {
  return (<Content style={{ margin: "20px 16px", overflowY: "scroll", overflowX: "hidden" }}>
  <Row type="flex" gutter={[5, 20]}>
    <Col span={12}>
      <Accounts accounts={accounts}/>
    </Col>
    <Col span={12}>
      <Accounts accounts={nextAccounts}/>
    </Col>
  </Row>

  <Row type="flex" justify="space-between" gutter={[5, 20]}>
    <Col span={6}>
      <Costs costs={costs}/>
    </Col>
    <Col span={6}>
      <Incomes
        incomes={incomes}
        accounts={accounts}
      />
    </Col>
    <Col span={6}>
      <Costs costs={nextCosts}/>
    </Col>
    <Col span={6}>
      <Incomes
        incomes={nextIncomes}
        accounts={accounts}
      />
    </Col>
  </Row>
</Content>
  );
}

export default compose(
  connect(
    state => ({
      incomes: getPlannedIncomes(state),
      nextIncomes: getPlannedIncomesNext(state),
      costs: getPlannedCosts(state),
      nextCosts: getPlannedCostsNext(state),
      accounts: getAccountsWhithPlannedBalance(state),
      nextAccounts: getAccountsWhithPlannedBalanceNext(state),
    }),
    dispatch => ({
      addIncome: (transactionsStatus, income) => dispatch(addIncome(transactionsStatus, income)),
      deleteIncome: (transactionsStatus, id) => dispatch(deleteIncome(transactionsStatus, id)),
    })
  ),
  //  withError,
)(Budget)
