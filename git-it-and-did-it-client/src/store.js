import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import auth from './reducers/Auth/reducer'
import errors from './reducers/Error/reducer'

const reducer = combineReducers({
  login: auth,
  errors: errors,
  tasks: null
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store