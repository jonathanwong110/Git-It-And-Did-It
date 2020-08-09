import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './redux/Auth/reducer'
import usersReducer from './redux/Users/reducer';
import tasksReducer from './redux/Tasks/reducer';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tasks: tasksReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store