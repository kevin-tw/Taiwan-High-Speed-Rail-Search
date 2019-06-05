import React from 'react'
import { Select } from 'antd'

const { Option } = Select

export const FormSelect = (options = []) => (
  <Select style={{ width: 100 }}>
    {options.map(option => (
      <Option
        key={option.value}
        value={option.value}
      >
        {option.text}
      </Option>
    ))}
  </Select>
)

export default FormSelect