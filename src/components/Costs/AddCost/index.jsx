import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd'
import { withFormik } from 'formik';
import * as yup from 'yup'
import moment from 'moment';

const { Option } = Select;

const schema = yup.object().shape({
  category: yup.number().required(),
  name: yup.string().required(),
  amount: yup.number().required(),
  committed: yup.date().required(),
  account: yup.number().required(),
  plan: yup.boolean()
})

function AddCost({
  isFetching,
  addCost,
  categories,
  form,
  isSubmit,
}) {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState(null)
  const { getFieldDecorator } = form

  useEffect(() => {
    if(isSubmit) {
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
        console.log('Received values of form: ', { category, ...values });
        addCost({ category, ...values })
      }
    })
    
  }

  const renderCategories = () => {
    return categories.map(category => {
      return <Option value={category.id} key={category.id}>{category.title}</Option>
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
        <Form.Item label="Расход">
        {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Выберите категорию' }],
            })( <Select
              placeholder="Выберите категорию"
              onChange={handleSelectChange}
            >
              {renderCategories()}
            </Select>)}
           
            </Form.Item>
          <Form.Item label="Расход">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Введите имя расхода', type: 'string' }],
            })(<Input placeholder="Наименование"/>)}
          </Form.Item>
          <Form.Item label="Сумма">
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: 'Введите сумму расхода!', type: 'string' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Дата">
          {getFieldDecorator('commited', {
              rules: [{ required: true, message: 'ВЫберите дату!', type: 'object' }],
              initialValue: moment(),
            })( <DatePicker format="DD.MM.YYYY"/>)}
          </Form.Item>
          <Form.Item label="Счет списания">
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Выберите счет списания!', type: 'string' }],
              initialValue: '0',
            })(<Input />)}
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