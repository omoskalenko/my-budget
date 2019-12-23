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
}) {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState(null)
  const { getFieldDecorator } = form

  const types = {
    income: {
      title: 'Добавить доход',
      name: {
        label: '',
        message: '',
        placeholder: '',
      },
      account: {
        label: '',
        message: '',
        placeholder: '',
      },
      amount: {
        label: '',
        message: '',
        placeholder: '',
      },
      committed: {
        label: '',
        message: '',
        placeholder: '',
      },
      category: {
        label: '',
        message: '',
        placeholder: '',
      },
    },
    cost: {
      title: 'Добавить расход',
      name: {
        label: '',
        message: '',
        placeholder: '',
      },
      account: {
        label: '',
        message: '',
        placeholder: '',
      },
      amount: {
        label: '',
        message: '',
        placeholder: '',
      },
      committed: {
        label: '',
        message: '',
        placeholder: '',
      },
      category: {
        label: '',
        message: '',
        placeholder: '',
      },
    }
  }

  useEffect(() => {
    if (isSubmit) {
      setShow(false)
    }
  }, [isSubmit])


  const handleSelectChange = value => {
    setCategory(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        handleAdd({ ...values })
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
        title={types[type].title}
        visible={show}
        onOk={handleSubmit}
        confirmLoading={isFetching}
        onCancel={() => setShow(false)}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
        <Form.Item label={types[type].account.label}>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: types[type].account.message }],
              initialValue: "0",
            })(<Select
              placeholder={types[type].account.placeholder}
            >
              {renderAccounts()}
            </Select>)}
          </Form.Item>
          <Form.Item label={types[type].category.label}>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: types[type].category.message }],
            })(<Select
              placeholder={types[type].category.placeholder}
              // onChange={handleSelectChange}
            >
              {renderCategories()}
            </Select>)}
          </Form.Item>
          <Form.Item label={types[type].name.label}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: types[type].name.message, type: 'string' }],
            })(<Input placeholder={types[type].name.placeholder} />)}
          </Form.Item>
          <Form.Item label={types[type].amount.label}>
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: types[type].amount.message, type: 'string' }],
            })(<Input suffix={<img src={Rub} width="10" alt="Рубль"/>} />)}
          </Form.Item>
          <Form.Item label={types[type].committed.label}>
            {getFieldDecorator('committed', {
              rules: [{ required: true, message: types[type].committed.message, type: 'object' }],
              initialValue: moment(),
            })(<DatePicker format="DD.MM.YYYY" />)}
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
