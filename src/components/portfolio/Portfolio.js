import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './portfolio.less';
import { ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { findStockNameById, findFinishedTransactions } from '../../util';


class Portfolio extends Component {

    render() {
        const { transactions, stocks, auth } = this.props;
        return(
            <Fragment>
                <h2>Portfolio</h2>
                <hr/>
                {
                    /* transactions.map(transaction => (
                        <ListGroup key={ transaction.id }>
                            <Fragment>
                                Transaction ID: <br/>{ transaction.id }
                            </Fragment>
                        {
                            transaction.lineItems.map(lineItem => (
                                <ListGroupItem key={ lineItem.id }>
                                    <h5>
                                        <Badge color='primary'>{ findStockNameById(stocks, lineItem.stockId) }</Badge>
                                        <Badge color='success' className={ style.quantity }>Quantity: { lineItem.quantity }</Badge>
                                    </h5>
                                </ListGroupItem>
                            ))
                        }
                        </ListGroup>
                    )) */
                }
            </Fragment>
        )
    }
} 


const mapStateToProps = ({ transactions, stocks, auth }) => {
    transactions = findFinishedTransactions(transactions);
    //console.log(transactions);
    return { transactions, stocks, auth };
}


export default connect(mapStateToProps)(Portfolio);