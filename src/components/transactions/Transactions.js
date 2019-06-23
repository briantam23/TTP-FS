import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import style from './transactions.less';
import { ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { findStockNameById, findFinishedTransactions } from '../../util';


const Transactions = ({ transactions, stocks, auth }) => (
    <Fragment>
        <h2>Transactions</h2>
        <hr/>
    {
        transactions.map(transaction => (
            <ListGroup className={ style.listGroup } key={ transaction.id }>
                <h5>
                    <strong>Transaction ID: </strong>
                    <br/>{ transaction.id }
                </h5>
            {
                transaction.lineItems.map(lineItem => (
                    <ListGroupItem key={ lineItem.id }>
                        <h5>
                            <strong>Stock Symbol: </strong>
                            { findStockNameById(stocks, lineItem.stockId) }
                        </h5>
                        <h5>
                            <strong>Quantity: </strong>
                            { lineItem.quantity }
                        </h5>
                    </ListGroupItem>
                ))
            }
            {
                transaction.totalCost ? (
                    <h4 className={ style.transactionTotal }>
                        <strong>Total: </strong> 
                        ${ transaction.totalCost }
                    </h4> 
                ): null
            }
                <hr/>
            </ListGroup>
        ))
    }
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks, auth }) => {
    transactions = findFinishedTransactions(transactions, auth);
    return { transactions, stocks, auth };
}


export default connect(mapStateToProps)(Transactions);