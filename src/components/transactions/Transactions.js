import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { findStockNameById, findFinishedTransactions } from '../../util';
import transactionsReducer from '../../store/reducers/transactions';


const Transactions = ({ transactions, stocks, auth }) => (
    <Fragment>
        <h2>Orders</h2>
        <hr/>
    {
        transactions.map(transaction => (
            <Fragment key={ transaction.id }>
                <div>
                    Transaction ID: <br/>{ transaction.id }
                </div>
            {
                transaction.lineItems.map(lineItem => (
                    <Fragment key={ lineItem.id }>
                        <h5>{ findStockNameById(stocks, lineItem.stockId) }</h5>
                        <h5>Quantity: { lineItem.quantity }</h5>
                    </Fragment>
                ))
            }
            </Fragment>
        ))
    }
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks, auth }) => {
    transactions = findFinishedTransactions(transactions);
    return { transactions, stocks, auth };
}


export default connect(mapStateToProps)(Transactions);