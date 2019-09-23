import axios from 'axios'

export const FETCH_PROPOSAL_STARTED   = 'FETCH_PROPOSAL_STARTED'
export const FETCH_PROPOSAL_SUCCESS   = 'FETCH_PROPOSAL_SUCCESS'
export const FETCH_PROPOSAL_FAILURE   = 'FETCH_PROPOSAL_FAILURE'
export const APPROVE_PROPOSAL_SUCCESS = 'APPROVE_PROPOSAL_SUCCESS'

// actions
export const fetchProposalStarted = () => ({
  type: FETCH_PROPOSAL_STARTED
})

export const fetchProposalSuccess = proposal => ({
  type: FETCH_PROPOSAL_SUCCESS,
  proposal
})

export const fetchProposalFailure = message => ({
  type: FETCH_PROPOSAL_FAILURE,
  message
})

export const approveProposalSuccess = proposal => ({
  type: APPROVE_PROPOSAL_SUCCESS,
  proposal
})

export const fetchProposal = () => dispatch => {
  dispatch(fetchProposalStarted)
  const api = 'http://localhost:3000'
  axios
    .get(`${api}/proposal`)
    .then(res => {
      dispatch(fetchProposalSuccess(res.data))
    })
    .catch(err => {
      dispatch(fetchProposalFailure(err.message))
    })
}

export const approveProposal = id => dispatch => {
  dispatch(approveProposalSuccess)
  const api = 'http://localhost:3000'
  axios
    .patch(`${api}/proposal/${id}`, {
      status: 'Aprovado'
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

// reducer
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSAL_SUCCESS:
      return action.proposal
    case FETCH_PROPOSAL_FAILURE:
      return state
    case APPROVE_PROPOSAL_SUCCESS:
      return { ...action.proposal }
    default:
      return state
  }
}
