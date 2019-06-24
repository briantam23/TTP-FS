import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import style from './transactions.less';
import { ListGroup, ListGroupItem, Button, Badge, Jumbotron } from 'reactstrap';
import { findStockNameById, findFinishedTransactions, getDate, getEasternTime } from '../../util';


const Transactions = ({ transactions, stocks, auth }) => (
    <Fragment>
        <div className={ style.transactionsHeader }>
            <h2>Transactions</h2>
            <h4 className={ style.balance }>
            {
                auth.balance ? ('Balance ($' + auth.balance + ')') : null
            }
            </h4>
        </div>
        <hr/>
    {
        transactions.length ? (
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
                                <strong>Purchased on:</strong> 
                                <br/>
                                { getDate(transaction) } <strong>at</strong> { getEasternTime(transaction) }
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
                            </h5>
                            <h5>
                                <strong>Quantity: </strong>
                                { lineItem.quantity }
                                <br/>
                            </h5>
                            <h5>
                                <strong>Unit Price: </strong>
                                ${ lineItem.price }
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