import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './cart.less';
import { Table, Button } from 'reactstrap';
import { createLineItem, updateLineItem, deleteLineItem, updateTransaction } from '../../store/actions/transactions';
import { findPendingTransaction, findLineItemById, findCurrentPriceById, findCartTotal } from '../../util';


const Cart = ({ cart, stocks, auth, createLineItem, updateLineItem, deleteLineItem, updateTransaction, history }) => (
    <Fragment>
        <div className={ style.cartHeader }>
            <h2>Cart</h2>
            <h4 className={ style.balance }>
            {
                auth.balance ? ('Balance ($' + auth.balance + ')') : null
            }
            </h4>
        </div>
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
                const lineItem = findLineItemById(cart, stock);
                if(lineItem) {
                    quantity = lineItem.quantity;
                    inCart = true;
                    lineItem.price = findCurrentPriceById(stocks, lineItem.stockId);
                }
                const transactionId = cart.id;
                return(
                    <tr key={ idx }>
                        <td>{ stock.symbol }</td>
                        <td>${ stock.latestPrice }</td>
                        <td>{ quantity }</td>
                        <td onClick={ 
                                () => inCart ? 
                                updateLineItem(lineItem, transactionId, quantity, 'increment') : 
                                createLineItem(stock, transactionId) 
                                }>
                            <Button disabled={ !auth.id }>+</Button>
                        </td>
                        <td onClick={ 
                                () => quantity > 1 ? 
                                updateLineItem(lineItem, transactionId, quantity, 'decrement') : 
                                deleteLineItem(lineItem, transactionId) 
                                }>
                            <Button disabled={ quantity === 0 || !auth.id }>-</Button>
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
        </Table>
        <h4 className={ style.cartTotal }>
                <strong>Total: </strong> 
                ${ findCartTotal(cart).toFixed(2) }
        </h4> 
    {
        findCartTotal(cart).toFixed(2) < auth.balance ? (
            <Button 
                onClick={ () => updateTransaction(cart, auth, stocks, history) }
                disabled={ !cart.lineItems[0] }
                color='primary' block
                >
                    Create Transaction
            </Button>
        ) : (
            <Button disabled color='danger' block>Not enough funds!</Button>
        )
    }
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks, auth }, { history }) => {
    const cart = findPendingTransaction(transactions);
    return { cart, stocks, auth, history };
}

const mapDispatchToProps = ({ createLineItem, updateLineItem, deleteLineItem, updateTransaction });


export default connect(mapStateToProps, mapDispatchToProps)(Cart);