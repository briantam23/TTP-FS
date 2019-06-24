import { LOAD_INITIAL_TRANSACTIONS, UPDATE_TRANSACTION, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM } from '../constants';
import axios from 'axios';
import { _updateAuth } from '../actions/auth';
import { _updateUser } from '../actions/users';
import { findCurrentPriceById, findCartTotal } from '../../util';


const _loadInitialTransactions = transactions => ({
    type: LOAD_INITIAL_TRANSACTIONS,
    transactions
})
export const loadInitialTransactions = userId => (
    dispatch => {
        return axios.get(`/api/transactions`)
            .then(res => res.data)
            .then(transactions => dispatch(_loadInitialTransactions(transactions)))
    }
)

const _createLineItem = lineItem => ({
    type: CREATE_LINE_ITEM,
    lineItem
}) 
export const createLineItem = (stock, transactionId) => {
    let lineItem = { ...stock, stockId: stock.id, price: stock.latestPrice }, userId;
    return(
        dispatch => (
            axios.post(`/api/users/${userId}/transaction/${transactionId}/lineItems`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_createLineItem(lineItem)))
    )
)}

const _updateLineItem = lineItem => ({
    type: UPDATE_LINE_ITEM,
    lineItem
})
export const updateLineItem = (lineItem, transactionId, _quantity, change) => {
    change === 'increment' ? change = 1 : change = -1;
    let userId;
    lineItem = { ...lineItem, quantity: _quantity + change };
    return(
        dispatch => (
            axios.put(`/api/users/${userId}/transaction/${transactionId}/lineItems/${lineItem.id}`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_updateLineItem(lineItem)))
        )
    )
}

const _deleteLineItem = lineItem => ({
    type: DELETE_LINE_ITEM,
    lineItem
})
export const deleteLineItem = (lineItem, transactionId) => {
    let userId;
    return dispatch => (
        axios.delete(`/api/users/${userId}/transaction/${transactionId}/lineItems/${lineItem.id}`)
            .then(() => dispatch(_deleteLineItem(lineItem)))
    )
}

const _updateTransaction = (transaction, userId) => ({
    type: UPDATE_TRANSACTION,
    transaction,
    userId
})
export const updateTransaction = (cart, auth, stocks, history) => {
    const totalCost = findCartTotal(cart).toFixed(2);
    const updatedBalance = auth.balance - totalCost;
    const newTransaction = { ...cart, status: 'TRANSACTION', totalCost };
    const updatedUser = { ...auth, balance: updatedBalance.toFixed(2) };
    
    return dispatch => (
        axios.put(`/api/users/${auth.id}/transaction/${cart.id}`, newTransaction)

            .then(() => axios.put(`/api/users/${auth.id}`, updatedUser))
            .then(res => res.data)
            .then(_updatedUser => {
                dispatch(_updateAuth(_updatedUser));
                dispatch(_updateUser(_updatedUser));
            })

            .then(() => axios.get(`/api/transactions`))
            .then(res => res.data)
            .then(newTransactions => {
                history.push('/transactions');
                dispatch(_updateTransaction(newTransactions));
            })
    )
}