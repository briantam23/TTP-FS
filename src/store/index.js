import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';


const reducer = combineReducers({
    users: usersReducer,
    auth: authReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;