import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import { Spinner } from 'reactstrap';
import { loadInitialUsers } from '../../store/actions/users';
import { loadInitialTransactions } from '../../store/actions/transactions';
import { loadInitialStocks } from '../../store/actions/stocks';
import NavBar from '../navBar/NavBar';
import SignIn from '../signIn/SignIn';
import Register from '../register/Register';
import Portfolio from '../portfolio/Portfolio';
import Transactions from '../transactions/Transactions';


class App extends Component {

    state = { loading: true };

    componentDidMount = () => {
        const { loadInitialUsers, loadInitialTransactions, loadInitialStocks, auth } = this.props;
        loadInitialTransactions(auth.id)
            .then(() => loadInitialUsers())
            .then(() => loadInitialStocks())
            .then(() => this.setState({ loading: false }))
    }

    render() {
        const { loading } = this.state;
        const { auth } = this.props;
        return(
            <Router>
            {
                loading 
                    ? <Spinner color='primary'/>
                    : (
                        <div className={ style.mainContainer }>
                            <h1 className={ style.title }>TTP-FS: Brian Tam</h1>
                            <Route render={ () => <NavBar/> }/>
                            <Route exact path='/' render={ ({ history }) => <SignIn history={ history }/> }/>
                            <Route path='/register' render={ ({ history }) => <Register history={ history }/> }/>
                            <Route path='/portfolio' render={ () => <Portfolio/> }/>
                            <Route path='/transactions' render={ () => <Transactions/> }/>
                            <a className={ style.footer } href="https://iexcloud.io">Data provided by IEX Cloud</a>
                        </div>
                    )
            }
            </Router>
        )
    }
}


const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = { loadInitialUsers, loadInitialTransactions, loadInitialStocks };


export default connect(mapStateToProps, mapDispatchToProps)(App);