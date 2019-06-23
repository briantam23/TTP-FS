import React, { Fragment } from 'react';
import style from './navBar.less';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const NavBar = ({ auth }) => {
    return(
        <div className={ style.nav }>
            <Nav tabs>
                <NavItem className={ style.navItem }>
                    <NavLink tag={ Link } to='/'>
                        Account
                    </NavLink>
                </NavItem>
            {
                auth.id ? (
                    <Fragment>
                        <NavItem className={ style.navItem }>
                            <NavLink tag={ Link } to='/portfolio'>
                                Portfolio
                            </NavLink>
                        </NavItem>
                        <NavItem className={ style.navItem }>
                            <NavLink tag={ Link } to='/cart'>
                                Cart
                            </NavLink>
                        </NavItem>
                        <NavItem className={ style.navItem }>
                            <NavLink tag={ Link } to='/transactions'>
                                Transactions
                            </NavLink>
                        </NavItem>
                    </Fragment>
                ) : null
            }
            </Nav>
        </div>
    )
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(NavBar);