import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { createLineItem, updateLineItem, deleteLineItem, updateTransaction } from '../../store/actions/transactions';
import { findPendingTransaction, findLineItemById } from '../../util';


const Porfolio = ({ cart, stocks, createLineItem, updateLineItem, deleteLineItem, updateOrder, history }) => (
    <Fragment>
        <h2>Cart</h2>
        <hr/>
        <h3>Stocks</h3>
        <Table dark striped>
        <thead>
            <tr>
                <th>Stock Name</th>
                <th>Latest Price</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
        {
            stocks.map((stock, idx) => {
                let quantity = 0;
                let inCart = false;
                let lineItem = null;
                if(findLineItemById(cart, stock)) {
                    lineItem = findLineItemById(cart, stock);
                    quantity = lineItem.quantity;
                    inCart = true;
                }
                const transactionId = cart.id;
                return(
                    <tr key={ idx }>
                        <td>{ stock.symbol }</td>
                        <td>{ stock.latestPrice }</td>
                        <td>{ quantity }</td>
                        <td onClick={ 
                                () => inCart ? 
                                updateLineItem(lineItem, transactionId, quantity, 'increment') : 
                                createLineItem(stock, transactionId) 
                                }>
                            <Button>+</Button>
                        </td>
                        <td onClick={ 
                                () => quantity > 1 ? 
                                updateLineItem(lineItem, transactionId, quantity, 'decrement') : 
                                deleteLineItem(lineItem, transactionId) 
                                }>
                            <Button disabled={ quantity === 0 }>-</Button>
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
        </Table>
        <Button color='primary' block>Create Transaction</Button>
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks }, { history }) => {
    const cart = findPendingTransaction(transactions);
    console.log(stocks)
    return { cart, stocks, history };
}

const mapDispatchToProps = ({ createLineItem, updateLineItem, deleteLineItem, updateTransaction });


export default connect(mapStateToProps, mapDispatchToProps)(Porfolio);