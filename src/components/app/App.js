import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import SignIn from '../signIn/SignIn';


const App = () => {
    return(
        <Router>
            <div className={ style.mainContainer }>
                <Route render={ () => <SignIn/> }/>
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
            </div>
        </Router>
    )
}


export default App;