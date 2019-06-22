import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';
import transactionsReducer from './reducers/transactions';
import stocksReducer from './reducers/stocks';


const reducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    transactions: transactionsReducer,
    stocks: stocksReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;