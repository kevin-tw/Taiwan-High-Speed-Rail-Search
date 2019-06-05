import React from 'react'
import { Tag } from 'antd'

const tagGroup = (tags = []) => (
  <>
    {
      tags.map(tag => (
        <Tag color={tag.color} key={tag.text}>
          {tag.text}
        </Tag>
      ))
    }
  </>
)

export default tagGroup