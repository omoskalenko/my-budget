import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import { TRANSACTIONS_TITLES } from "../../../config";

import Rub from "../../../images/rub.svg";

const { Option } = Select;

function AddTransactionForm({ isFetching, handleAdd, categories, accounts, form, isSubmit, className, config }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isSubmit) {
      setShow(false);
    }
  }, [isSubmit]);

  const { getFieldDecorator } = form;

  const { type, status } = config;

  const titles = (type || status) && TRANSACTIONS_TITLES[type.toUpperCase()][status.toUpperCase()]["ADD"];

  if (!titles) return null;

  const renderCategories = () => {
    return categories.map(category => {
      return (
        <Option value={category.id} key={category.id}>
          {category.title}
        </Option>
      );
    });
  };
  const renderAccounts = () => {
    return accounts.map(account => {
      return (
        <Option value={account.id} key={account.id}>
          {account.title}
        </Option>
      );
    });
  };

  const renderPeriodicity = () => {
    return ['everyyear', 'monthly','daily'].map(periodicity => {
      return (
        <Option value={periodicity} key={periodicity}>
          {periodicity}
        </Option>
      );
    });
  };

  const selectField = (name, render, required) => (
    <Form.Item key={name} label={titles[name].label}>
      {getFieldDecorator(name, {
        rules: [{ required: required, message: titles[name].message }]
      })(
        <Select placeholder={titles[name].placeholder} size="large">
          {render()}
        </Select>
      )}
    </Form.Item>
  );

  const inputField = (name, required) => (
    <Form.Item key={name} label={titles.name.label}>
      {getFieldDecorator(name, {
        rules: [{ required: required, message: titles[name].message, type: "string" }]
      })(<Input size="large" placeholder={titles[name].placeholder} />)}
    </Form.Item>
  );

  const amountField = (
    <Form.Item key={1} label={titles.amount.label}>
      {getFieldDecorator("amount", {
        rules: [{ required: true, message: titles.amount.message, type: "string" }]
      })(<Input type="number" size="large" suffix={<img src={Rub} width="14" alt="Рубль" />} placeholder={titles.amount.placeholder} />)}
    </Form.Item>
  );

  const dateField = name => (
    <Form.Item key={name} label={titles[name].label}>
      {getFieldDecorator(name, {
        rules: [{ required: true, message: titles[name].message, type: "object" }],
        initialValue: moment()
      })(<DatePicker size="large" format="DD.MM.YYYY" />)}
    </Form.Item>
  );

  const committedFields = () => ({
    account: selectField('account', renderAccounts, true),
    category: selectField('category', renderCategories, true),
    amount: amountField,
    name: inputField('name', (config.type === 'costs')),
    commit: dateField('commit'),
  })

  const plannedFields = () => ({
    category: selectField('category', renderCategories, true),
    name: inputField('name', (config.type === 'costs')),
    amount: amountField,
    startDate: dateField('start'),
    periodicity: selectField('periodicity', renderPeriodicity, true),
    committed: [],
  })

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log(values);

      if (!err) {
        handleAdd({ ...values });
        console.log(form);
      }
    });
  };

  return (
    <div>
      <Button shape="circle" icon="plus" onClick={() => setShow(true)} />
      <Modal
        className={className}
        title={titles.title}
        visible={show}
        onOk={handleSubmit}
        confirmLoading={isFetching}
        onCancel={() => setShow(false)}
      >
        <Form onSubmit={handleSubmit}>
          {(config.status === 'committed')
          ? Object.values(committedFields())
          : Object.values(plannedFields())}
        </Form>
      </Modal>
    </div>
  );
}

AddTransactionForm.defaultProps = {
  config: {
    type: "",
    status: ""
  }
};

export default Form.create()(AddTransactionForm);

// withFormik({
//   mapPropsToValues: () => ({}),
//   validationSchema: () => (schema),
//   handleSubmit: (values, { setSubmitting, props }) => {
//       props.handleAdd(values)
//       setSubmitting(false);
//   },
// })(AddCost)

// const types = {
//   incomes: {
//     title: 'Добавить доход',
//     name: {
//       label: '',
//       message: '',
//       placeholder: 'Комментарий',
//     },
//     account: {
//       label: 'Счет',
//       message: 'Выберите счет зачисления!',
//       placeholder: 'Счет',
//     },
//     amount: {
//       label: '',
//       message: 'Введите сумму дохода!',
//       placeholder: 'Сумма',
//     },
//     committed: {
//       label: '',
//       message: 'Выберите дату!',
//       placeholder: '',
//     },
//     category: {
//       label: '',
//       message: 'Выберите категорию!',
//       placeholder: 'Категория',
//     },
//   },
//   costs: {
//     title: 'Добавить расход',
//     name: {
//       label: '',
//       message: '',
//       placeholder: 'На что совершен расход?',
//     },
//     account: {
//       label: 'Счет',
//       message: 'Выберите счет списания!',
//       placeholder: 'Счет',
//     },
//     amount: {
//       label: '',
//       message: 'Введите сумму расхода!',
//       placeholder: 'Сумма',
//     },
//     committed: {
//       label: '',
//       message: 'Выберите дату!',
//       placeholder: '',
//     },
//     category: {
//       label: '',
//       message: 'Выберите категорию!',
//       placeholder: 'Категория',
//     },
//   }
// }
