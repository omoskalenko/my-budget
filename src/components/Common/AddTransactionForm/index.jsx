import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, DatePicker, Select, Icon } from 'antd'
import moment from 'moment';
import { moduleName } from '../../../containers/costs/costs'

import Rub from '../../../images/rub.svg'

const { Option } = Select;

function AddTransactionForm({
  isFetching,
  handleAdd,
  categories,
  accounts,
  form,
  isSubmit,
  type,
  className,
}) {
  const [show, setShow] = useState(false)

  const { getFieldDecorator } = form

  const types = {
    income: {
      title: 'Добавить доход',
      name: {
        label: '',
        message: '',
        placeholder: 'Комментарий',
      },
      account: {
        label: 'Счет',
        message: 'Выберите счет зачисления!',
        placeholder: 'Счет',
      },
      amount: {
        label: '',
        message: 'Введите сумму дохода!',
        placeholder: 'Сумма',
      },
      committed: {
        label: '',
        message: 'Выберите дату!',
        placeholder: '',
      },
      category: {
        label: '',
        message: 'Выберите категорию!',
        placeholder: 'Категория',
      },
    },
    cost: {
      title: 'Добавить расход',
      name: {
        label: '',
        message: '',
        placeholder: 'На что совершен расход?',
      },
      account: {
        label: 'Счет',
        message: 'Выберите счет списания!',
        placeholder: 'Счет',
      },
      amount: {
        label: '',
        message: 'Введите сумму расхода!',
        placeholder: 'Сумма',
      },
      committed: {
        label: '',
        message: 'Выберите дату!',
        placeholder: '',
      },
      category: {
        label: '',
        message: 'Выберите категорию!',
        placeholder: 'Категория',
      },
    }
  }

  useEffect(() => {
    if (isSubmit) {
      setShow(false)
    }
  }, [isSubmit])


  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        handleAdd({ ...values })
        console.log(form);
      }
    })

  }

  const renderCategories = () => {
    return categories.map(category => {
      return <Option value={category.id} key={category.id}>{category.title}</Option>
    })
  }
  const renderAccounts = () => {
    return accounts.map(account => {
      return <Option value={account.id} key={account.id}>{account.title}</Option>
    })
  }

  return (
    <div>
      <Button type="primary" shape="circle" icon="plus" onClick={() => setShow(true)} />
      <Modal
        className={className}
        title={types[type].title}
        visible={show}
        onOk={handleSubmit}
        confirmLoading={isFetching}
        onCancel={() => setShow(false)}
      >
        <Form onSubmit={handleSubmit}>
        <Form.Item label={types[type].account.label}>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: types[type].account.message }],
              initialValue: "0",
            })(<Select
              placeholder={types[type].account.placeholder}
              size="large"
              style={{
                width: '100%'
              }}
            >
              {renderAccounts()}
            </Select>)}
          </Form.Item>
          <Form.Item label={types[type].category.label}>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: types[type].category.message }],
            })(<Select
              placeholder={types[type].category.placeholder}
              size="large"
            >
              {renderCategories()}
            </Select>)}
          </Form.Item>
          <Form.Item label={types[type].name.label}>
            {getFieldDecorator('name', {
              rules: [{ required: type === 'cost', message: types[type].name.message, type: 'string' }],
            })(<Input size="large" placeholder={types[type].name.placeholder} />)}
          </Form.Item>
          <Form.Item label={types[type].amount.label}>
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: types[type].amount.message, type: 'string' }],
            })(<Input size="large" suffix={<img src={Rub} width="14" alt="Рубль" />} placeholder={types[type].amount.placeholder} />)}
          </Form.Item>
          <Form.Item label={types[type].committed.label}>
            {getFieldDecorator('committed', {
              rules: [{ required: true, message: types[type].committed.message, type: 'object' }],
              initialValue: moment(),
            })(<DatePicker size="large" format="DD.MM.YYYY" />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create({ name: moduleName })(AddTransactionForm)

// withFormik({
//   mapPropsToValues: () => ({}),
//   validationSchema: () => (schema),
//   handleSubmit: (values, { setSubmitting, props }) => {
//       props.handleAdd(values)
//       setSubmitting(false);
//   },
// })(AddCost)
