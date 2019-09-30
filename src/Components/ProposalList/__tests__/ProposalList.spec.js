import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ProposalList, { ProposalList as Single } from '../ProposalList'
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

  it('should call fetch proposal on creation', () => {
    const spy = jest.fn()
    render(<Single proposals={[]} fetchProposal={spy} />)
    expect(spy).toHaveBeenCalled()
  })

  it('should update value on input change', () => {
    const { getByTestId } = render(<Single proposals={[]} fetchProposal={jest.fn()}/>)
    fireEvent.change(getByTestId('input-search'), { target: { value: 'a' } })
    expect(getByTestId('input-search')).toHaveValue('a')
  })

  it('returns correct value on handleTabChange', () => {
    const single = new Single()
    const v = single.handleTableChange()
    expect(v).toEqual('test')
  })
})
