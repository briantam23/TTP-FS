import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import { loadInitialUsers } from '../../store/actions/users';
import SignIn from '../signIn/SignIn';
import Register from '../register/Register';


class App extends Component {

    componentDidMount = () => {
        const { loadInitalUsers } = this.props;
        loadInitialUsers()
    }

    render() {
        return(
            <Router>
                <div className={ style.mainContainer }>
                    {/* <Route render={ () => <SignIn/> }/> */}
                    <Route render={ () => <Register/> }/>
                    <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
                </div>
            </Router>
        )
    }
}


const mapDispatchToProps = dispatch => { 
    return {
        loadInitialUsers: dispatch(loadInitialUsers())
    }
};


export default connect(null, mapDispatchToProps)(App);