import { LOAD_INITIAL_TRANSACTIONS, UPDATE_TRANSACTION, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM } from '../constants';


const transactionsReducer = (state = [], action) => {
    let cart = state.find(transaction => transaction.status === 'CART');
    switch(action.type) {
        case LOAD_INITIAL_TRANSACTIONS:
            return action.transactions;
        case CREATE_LINE_ITEM:
            let lineItems = [...cart.lineItems, action.lineItem];
            cart = { ...cart, lineItems };
            return state.map(transaction => transaction.status !== 'CART' ? transaction : cart);
        case UPDATE_LINE_ITEM:
            lineItems = cart.lineItems.map(_lineItem => _lineItem.id !== action.lineItem.id ? _lineItem : action.lineItem);
            cart = { ...cart, lineItems };
            return state.map(transaction => transaction.status !== 'CART' ? transaction : cart);
        case DELETE_LINE_ITEM:
            lineItems = cart.lineItems.filter(_lineItems => _lineItems !== action.lineItem);
            cart = { ...cart, lineItems };
            return state.map(transaction => transaction.status !== 'CART' ? transaction : cart);
        case UPDATE_TRANSACTION:
            return action.transaction;
        default:
            return state;
    }
}

export default transactionsReducer;