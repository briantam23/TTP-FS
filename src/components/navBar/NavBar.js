import React, { Fragment } from 'react';
import style from './navBar.less';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const NavBar = ({ auth }) => {
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
                        {
                            ['Portfolio', 'Cart', 'Transactions'].map((page, idx) => (
                                <NavItem key={ idx }>
                                    <NavLink 
                                        tag={ Link } 
                                        to={ `/${page.toLowerCase()}` } 
                                        className={ style.navLink }
                                        >
                                            { page }
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                        </Fragment>
                    ) : null
                }
                </div>
            </Nav>
        </div>
    )
}


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(NavBar);