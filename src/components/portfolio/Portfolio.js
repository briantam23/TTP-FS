import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './portfolio.less';
import { ListGroup, ListGroupItem, Jumbotron } from 'reactstrap';
import { findTotalsByStock, findPortfolioValue, getPerformanceColor } from '../../util';


const Portfolio = ({ stockSet, stocks, auth }) => (
    <Fragment>
        <h2>Portfolio</h2>
        <hr/>    
    {
        stockSet.length ? (
            stockSet.map(stock => {
                const { id, symbol, quantity, currentPrice, openPrice } = stock;
                return(
                    <ListGroup>
                        <ListGroupItem className={ getPerformanceColor(currentPrice, openPrice, style) } key={ id }>
                            <h5>
                                <strong>Stock Symbol: </strong>
                                { symbol }
                            </h5>
                            <h5>
                                <strong>Shares: </strong>
                                { quantity }
                            </h5>
                            <h5>
                                <strong>Unit Price: </strong>
                                ${ (currentPrice).toFixed(2) }
                            </h5>
                            <h5>
                                <strong>Total Price: </strong>
                                ${ (quantity * currentPrice).toFixed(2) }
                            </h5>
                        </ListGroupItem>
                    </ListGroup>
                )
            })
        ) : (
            <Jumbotron className={ style.emptyPortfolio }>
                <h1>Empty Portfolio!</h1>
                <Link to='/stocks'>
                    <br/>
                    <h4>Add some stocks here!</h4>
                </Link>
            </Jumbotron>
        )
    }
    {
        stockSet.length ? (
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