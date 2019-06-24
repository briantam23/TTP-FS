import React, { Fragment } from 'react';
import style from './navBar.less';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { findPendingTransaction, findCartCount, findFinishedTransactions } from '../../util';


const NavBar = ({ auth, cartCount, finishedTransactionsCount }) => {
    return(
        <div className={ style.nav }>
            <Nav className="navbar navbar-dark bg-dark">
                <div>
                    <div>
                        <Link className="navbar-brand" to="/">
                            <h2>TTP-FS: Brian Tam</h2>
                        </Link>
                    </div>
                </div>
                <div className={ style.navItems }>
                    <NavItem>
                        <NavLink tag={ Link } to='/' className={ style.navLink }>
                            Account
                        </NavLink>
                    </NavItem>
                {
                    auth.id ? (
                        <Fragment>
                            <NavItem>
                                <NavLink 
                                    tag={ Link } 
                                    to='/portfolio' 
                                    className={ style.navLink }
                                    >
                                        Porfolio
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink 
                                    tag={ Link } 
                                    to='/stocks' 
                                    className={ style.navLink }
                                    >
                                        Stocks
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink 
                                    tag={ Link } 
                                    to='/cart' 
                                    className={ style.navLink }
                                    >
                                        Cart <Badge color='primary'>{ cartCount }</Badge>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink 
                                    tag={ Link } 
                                    to='/transactions' 
                                    className={ style.navLink }
                                    >
                                        Transactions <Badge color='primary'>{ finishedTransactionsCount }</Badge>
                                </NavLink>
                            </NavItem>
                        </Fragment>
                    ) : null
                }
                </div>
            </Nav>
        </div>
    )
}


const mapStateToProps = ({ auth, transactions }) => { 
    const cart = findPendingTransaction(transactions);
    const cartCount = findCartCount(cart);
    const finishedTransactionsCount = findFinishedTransactions(transactions, auth).length;

    return { auth, cartCount, finishedTransactionsCount };
}

export default connect(mapStateToProps)(NavBar);