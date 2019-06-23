import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { createLineItem, updateLineItem, deleteLineItem, updateTransaction } from '../../store/actions/transactions';


const Porfolio = ({ transactions, stocks, createLineItem, updateLineItem, deleteLineItem, updateOrder, history }) => (
    <Fragment>
        <h2>Cart</h2>
        <hr/>
        <h3>Stocks</h3>
        <Table dark striped>
        <thead>
            <tr>
                <th>Stock Name</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </Table>
        <Button color='primary' block>Create Transaction</Button>
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks }, { history }) => {
    return { transactions, stocks, history };
}
const mapDispatchToProps = ({ createLineItem, updateLineItem, deleteLineItem, updateTransaction });


export default connect(mapStateToProps, mapDispatchToProps)(Porfolio);