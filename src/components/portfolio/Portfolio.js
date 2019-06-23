import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import style from './portfolio.less';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { findTotalsByStock, findPortfolioValue } from '../../util';


const Portfolio = ({ stockSet, stocks, auth }) => (
    <Fragment>
        <h2>Portfolio</h2>
        <hr/>
        <ListGroup>
        {
            stockSet.map(stock => {
                const { id, symbol, quantity, currentPrice } = stock;
                return(
                    <ListGroupItem key={ id }>
                        <h5>
                            <strong>Stock Symbol: </strong>
                            { symbol }
                        </h5>
                        <h5>
                            <strong>Shares: </strong>
                            { quantity }
                        </h5>
                        <h5>
                            <strong>Total Share Price: </strong>
                            ${ quantity * currentPrice }
                        </h5>
                    </ListGroupItem>
                )
            })
        }
        </ListGroup>
    {
        stockSet[0] ? (
            <h4 className={ style.total }>
                <strong>Total: </strong> 
                ${ findPortfolioValue(stockSet) }
            </h4> 
        ): null
    }
    </Fragment>
)


const mapStateToProps = ({ transactions, stocks, auth }) => {
    const stockSet = findTotalsByStock(transactions, stocks, auth);
    return { stockSet, stocks, auth };
}


export default connect(mapStateToProps)(Portfolio);