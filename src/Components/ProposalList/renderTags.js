import React from 'react'
import { Tag } from 'antd'

export const getColor = (color) => color === 'Universitário'
  ? 'geekblue'
  : 'red'

const renderTags = flags => (
  <span>
    {flags.map(flag => {
      return (
        <Tag color={getColor(flag)}
          key={flag}>
          {flag.toUpperCase()}
        </Tag>
      )
    })}
  </span>
)

export default renderTags
