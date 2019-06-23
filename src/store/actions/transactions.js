import { LOAD_INITIAL_TRANSACTIONS, UPDATE_TRANSACTION, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM } from '../constants';
import axios from 'axios';


const _loadInitialTransactions = transactions => ({
    type: LOAD_INITIAL_TRANSACTIONS,
    transactions
})
export const loadInitialTransactions = userId => (
    dispatch => {
        /* if(userId) {
            return axios.get(`/api/users/${userId}/transactions`)
                .then(res => res.data)
                .then(transactions => dispatch(_loadInitialTransactions(transactions)))
        }
        else { */
            return axios.get(`/api/transactions`)
                .then(res => res.data)
                .then(transactions => dispatch(_loadInitialTransactions(transactions)))
        //}
    }
)

const _createLineItem = lineItem => ({
    type: CREATE_LINE_ITEM,
    lineItem
}) 
export const createLineItem = (stock, transactionId) => {
    let lineItem = { ...stock, stockId: stock.id }, userId;
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
export const updateTransaction = (cart, history) => {
    const newTransaction = { ...cart, status: 'TRANSACTION' };
    return dispatch => (
        axios.put(`/api/users/${cart.userId}/transaction/${cart.id}`, newTransaction)
            .then(() => axios.get(`/api/users/${cart.userId}/transaction`))
            .then(res => res.data)
            .then(newTransactions => {
                history.push('/transaction');
                dispatch(_updateTransaction(newTransactions, cart.userId));
            })
    )
}