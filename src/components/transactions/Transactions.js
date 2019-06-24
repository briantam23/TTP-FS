import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import style from './transactions.less';
import { ListGroup, ListGroupItem, Button, Badge, Jumbotron } from 'reactstrap';
import { findStockNameById, findFinishedTransactions } from '../../util';


const Transactions = ({ transactions, stocks, auth }) => (
    <Fragment>
        <h2>Transactions</h2>
        <hr/>
    {
        transactions[0] ? (
            transactions.map(transaction => (
                <ListGroup className={ style.listGroup } key={ transaction.id }>
                    <h5>
                        <div className={ style.listGroupHeaders }>
                            <div className={ style.listGroupHeader }>
                                <strong>Transaction ID: </strong>
                                <br/>
                                { transaction.id }
                                <br/>
                            </div>
                            <div className={ style.listGroupHeader }>
                                <strong>Ordered on:</strong> 
                                <br/>
                                { transaction.updatedAt.slice(0, 10) } <strong>at</strong> { transaction.updatedAt.slice(11, 16) }
                            </div>
                        </div>
                    </h5>
                {
                    transaction.lineItems.map(lineItem => (
                        <ListGroupItem color='info' key={ lineItem.id }>
                            <h5>
                                <strong>Stock Symbol: </strong>
                                { findStockNameById(stocks, lineItem.stockId) }
                                <br/>

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
        ) : (
            <Jumbotron className={ style.noTransactions }>
                <h3>No Transactions!</h3>
            </Jumbotron>
        )
    }
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks, auth }) => {
    transactions = findFinishedTransactions(transactions, auth);
    return { transactions, stocks, auth };
}


export default connect(mapStateToProps)(Transactions);