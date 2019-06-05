import React from 'react'
import { Form } from 'antd'

import SubmitButton from './SubmitButton'

const AppForm = ({
  form,
  fields = [],
  validateFields = () => {}
}) => {
  const { getFieldDecorator } = form
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(validateFields)
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        layout="inline"
        style={{ padding: '10px' }}
      >
        {fields.map(field => (
          <Form.Item
            key={field.id}
            label={field.label}
          >
            { getFieldDecorator(field.id, field.options)(field.component) }
          </Form.Item>
        ))}
        <Form.Item>
          <SubmitButton text="查詢" />
        </Form.Item>
      </Form>
    </>
  )
}

export default Form.create()(AppForm)