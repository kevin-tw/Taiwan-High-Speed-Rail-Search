import React from 'react'
import { Button } from 'antd'

export const SubmitButton = ({
  type = 'primary',
  size = 'default',
  htmlType = 'submit',
  text,
  onClick
}) => (
  <Button
    className="form-btn"
    type={type}
    size={size}
    htmlType={htmlType}
    onClick={onClick}
  >
    { text }
  </Button>
)

export default SubmitButton