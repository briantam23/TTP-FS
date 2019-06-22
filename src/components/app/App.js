import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import { loadInitialUsers } from '../../store/actions/users';
import { loadInitialTransactions } from '../../store/actions/transactions';
import { loadInitialStocks } from '../../store/actions/stocks';
import SignIn from '../signIn/SignIn';
import Register from '../register/Register';
import transactions from '../transactions/Transactions';
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
                    ? <div>Loading...</div>
                    : (
                        <div className={ style.mainContainer }>
                            <Route exact path='/' render={ () => <SignIn/> }/>
                            <Route path='/create-account' render={ () => <Register/> }/>
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

/* const mapDispatchToProps = dispatch => { 
    return {
        loadInitialUsers: dispatch(loadInitialUsers()),
        loadInitialTransactions: dispatch(loadInitialTransactions()),
        loadInitialStocks: dispatch(loadInitialStocks())
    }
}; */
const mapDispatchToProps = { loadInitialUsers, loadInitialTransactions, loadInitialStocks };


export default connect(mapStateToProps, mapDispatchToProps)(App);