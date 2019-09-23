import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ProposalList from '../index'
import proposals from '../ProposalListMock'

const mock = configureMockStore([thunk])

describe('ProposalList Component', () => {
  let store
  beforeEach(() => {
    store = new mock({ proposals })
  })

  it('renders without crash', () => {
    ReactDOM.render(
      <ProposalList store={store} />,
      document.createElement('div')
    )
  })

  it('renders table', () => {
    const { getByTestId } = render(<ProposalList store={store} />)
    expect(getByTestId('table')).toBeInTheDocument()
  })
})
