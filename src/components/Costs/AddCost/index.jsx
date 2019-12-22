import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, DatePicker, Select, Icon } from 'antd'
import { withFormik } from 'formik';
import moment from 'moment';

import Rub from '../../../images/rub.svg'

const { Option } = Select;

function AddCost({
  isFetching,
  addCost,
  categories,
  accounts,
  form,
  isSubmit,
}) {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState(null)
  const { getFieldDecorator } = form

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
        addCost({ category, ...values })
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
        title="Добавить расход"
        visible={show}
        onOk={handleSubmit}
        confirmLoading={isFetching}
        onCancel={() => setShow(false)}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
        <Form.Item label="Счет списания">
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Выберите счет списания!' }],
              initialValue: "0",
            })(<Select
              placeholder="Выберите счет списания"
            >
              {renderAccounts()}
            </Select>)}
          </Form.Item>
          <Form.Item label="Категория">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Выберите категорию' }],
            })(<Select
              placeholder="Выберите категорию"
              onChange={handleSelectChange}
            >
              {renderCategories()}
            </Select>)}
          </Form.Item>
          <Form.Item label="Расход">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Введите имя расхода', type: 'string' }],
            })(<Input placeholder="Наименование" />)}
          </Form.Item>
          <Form.Item label="Сумма">
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: 'Введите сумму расхода!', type: 'string' }],
            })(<Input suffix={<img src={Rub} width="10" />} />)}
          </Form.Item>
          <Form.Item label="Дата">
            {getFieldDecorator('committed', {
              rules: [{ required: true, message: 'ВЫберите дату!', type: 'object' }],
              initialValue: moment(),
            })(<DatePicker format="DD.MM.YYYY" />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create({ name: 'addCost' })(AddCost)

// withFormik({
//   mapPropsToValues: () => ({}),
//   validationSchema: () => (schema),
//   handleSubmit: (values, { setSubmitting, props }) => {
//       props.addCost(values)
//       setSubmitting(false);
//   },
// })(AddCost)