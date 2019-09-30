import reducer, * as actions from '../ProposalList'
import configureMock from 'redux-mock-store'
import thunk from 'redux-thunk'
import proposal from '../ProposalMock'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

const mock = configureMock([thunk])

describe('ProposalList Store', () => {

  it('fetchProposalFailure: returns expected action', async () => {
    jest
      .spyOn(axios, 'get')
      .mockReturnValue(new Promise((resolve, reject) => {
        reject({
          message: 'error',
          data: { message: 'erro' },
          status: 500
        })
      }))

    const store = mock([])
    const expectedActions = [
      { type: actions.FETCH_PROPOSAL_FAILURE, message: 'error' }
    ]

    await act(async () => {
      await store.dispatch(actions.fetchProposal())
    })
    expect(store.getActions()).toEqual(expectedActions)

  })

  it('fetchProposal: returns expected action', async () => {
    jest.spyOn(axios, 'get').mockReturnValue(new Promise((resolve) => {
      resolve({
        data: [proposal],
        status: 200
      })
    }))

    const store = mock([])
    const expectedActions = [
      { type: actions.FETCH_PROPOSAL_SUCCESS, proposals: [proposal] }
    ]

    await store.dispatch(actions.fetchProposal())

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('approveProposal: returns expected action on success', async () => {
    jest.spyOn(axios, 'patch').mockReturnValue(new Promise((resolve) => {
      resolve({
        data: {...proposal, key: 1},
        status: 200
      })
    }))

    const store = mock([])

    await act(async () => {
      await store.dispatch(actions.approveProposal(1))
    })

    expect(store.getActions()).toEqual([])
  })

  it('approveProposal: returns expected action on failure', async () => {
    jest.spyOn(axios, 'patch').mockReturnValue(new Promise((resolve, reject) => {
      reject({
        message: 'error',
        data: {...proposal, key: 1},
        status: 500
      })
    }))

    const store = mock([])

    await act(async () => {
      await store.dispatch(actions.approveProposal(1))
    })

    expect(store.getActions()).toEqual([])
  })

  it('FETCH_PROPOSAL_SUCCESS: reducer returns expected state', () => {
    const v = reducer([], {
      type: actions.FETCH_PROPOSAL_SUCCESS,
      proposals: [proposal]
    })

    expect(v).toEqual([proposal])
  })

  it('FETCH_PROPOSAL_FAILURE: reducer returns expected state', () => {
    const v = reducer([], {
      type: actions.FETCH_PROPOSAL_FAILURE
    })

    expect(v).toEqual([])
  })

  it('APPROVE_PROPOSAL_SUCCESS: reducer returns correct state', () => {
    const v = reducer([], {
      type: actions.APPROVE_PROPOSAL_SUCCESS,
      proposal
    })

    expect(v).toEqual(proposal)
  })

  it('returns default state', () => {
    expect(reducer([], { type: null })).toEqual([])
  })
})
