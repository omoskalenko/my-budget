import React from "react";
import { compose } from 'redux'
import Accounts from "../../containers/balance/PlannedBalanceContainer";
import Costs from "../../containers/costs/PlannedCosts";
import Incomes from "../../containers/incomes/PlannedIncomes";
import { Layout, Row, Col } from "antd";

import { connect } from 'react-redux'

import { addIncome, deleteIncome, getPlannedIncomes, moduleName, getPlannedIncomesNext } from '../../containers/incomes'
import { getIncomeCategories } from '../../containers/directores'
import { getAccountsWhithPlannedBalance } from '../../containers/balance'
import { TRANSACTIONS_STATUSES } from '../../config'

const { Content } = Layout;

const transactionsStatus = TRANSACTIONS_STATUSES.PLANNED

function Budget({
  isFetching,
  addIncome,
  deleteIncome,
  deleting,
  incomes,
  nextIncomes,
  categories,
  accounts,
  isSubmit,
  config,
}) {
  return (<Content style={{ margin: "20px 16px", overflowY: "scroll", overflowX: "hidden" }}>
  <Row type="flex" gutter={[5, 20]}>
    <Col span={12}>
      <Accounts />
    </Col>
    <Col span={12}>
      <Accounts />
    </Col>
  </Row>

  <Row type="flex" justify="space-between" gutter={[5, 20]}>
    <Col span={6}>
      <Costs />
    </Col>
    <Col span={6}>
      <Incomes
      isFetching={isFetching}
      addIncome={addIncome}
      deleteIncome={deleteIncome}
      deleting={deleting}
      incomes={incomes}
      categories={categories}
      accounts={accounts}
      isSubmit={isSubmit}
      config={config}
      />
    </Col>
    <Col span={6}>
      <Costs />
    </Col>
    <Col span={6}>
      <Incomes
      isFetching={isFetching}
      addIncome={addIncome}
      deleteIncome={deleteIncome}
      deleting={deleting}
      incomes={nextIncomes}
      categories={categories}
      accounts={accounts}
      isSubmit={isSubmit}
      config={config}
      />
    </Col>
  </Row>
</Content>
  );
}

export default compose(
  connect(
    state => ({
      isFetching: state[moduleName][transactionsStatus].isFetching,
      deleting: state[moduleName][transactionsStatus].deleting,
      incomes: getPlannedIncomes(state),
      nextIncomes: getPlannedIncomesNext(state),
      categories: getIncomeCategories(state),
      accounts: getAccountsWhithPlannedBalance(state),
      isSubmit: state[moduleName][transactionsStatus].isSubmit,
      config: state[moduleName][transactionsStatus].config,
    }),
    dispatch => ({
      addIncome: (transactionsStatus, income) => dispatch(addIncome(transactionsStatus, income)),
      deleteIncome: (transactionsStatus, id) => dispatch(deleteIncome(transactionsStatus, id)),
    })
  ),
  //  withError,
)(Budget)
