import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RenderTags, { getColor } from '../renderTags'

describe('renderTag', () => {
  it('renders in document', () => {
    const { container } = render(RenderTags(['Universitário', 'Fraude']))
    expect(container).toBeInTheDocument()
  })

  it('renders text with uppercase', () => {
    const { container } = render(RenderTags(['Universitário']))
    expect(container).toHaveTextContent('UNIVERSITÁRIO')    
  })

  it('renders correct color', () => {
    const red = getColor('Fraude')
    const geekblue = getColor('Universitário')

    expect(red).toBe('red')
    expect(geekblue).toBe('geekblue')
  })
})
