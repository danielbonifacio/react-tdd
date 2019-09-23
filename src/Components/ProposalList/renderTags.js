import React from 'react'
import { Tag } from 'antd'

const renderTags = flags => (
  <span data-testid="">
    {flags.map(flag => {
      const color = flag === 'Universitário' ? 'geekblue' : 'red'
      return (
        <Tag color={color}
          key={flag}>
          {flag.toUpperCase()}
        </Tag>
      )
    })}
  </span>
)

export default renderTags
