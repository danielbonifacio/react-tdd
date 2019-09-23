import * as Redux from 'redux'
import thunk      from 'redux-thunk'

import ProposalTable from './ProposalList'

const composeEnhancer
  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose

const reducers = Redux.combineReducers({
  ProposalTable
})

const store = Redux.createStore(
  reducers,
  composeEnhancer(Redux.applyMiddleware(thunk))
)

export default store
