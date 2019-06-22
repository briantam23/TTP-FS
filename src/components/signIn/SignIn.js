import React, { Component, Fragment } from 'react';
import style from './signIn.less';


class SignIn extends Component {
    render() {
        return(
            <div>
                <Fragment>
                    <input 
                        name='username' 
                        placeholder='Username'
                        size='20'
                        required
                        autoFocus 
                        />
                    <input 
                        name='password' 
                        placeholder='Password'
                        size='20'
                        required
                        type='password'
                        />
                    <button>Login</button>
                </Fragment>
            </div>
        )
    }
}


export default SignIn;