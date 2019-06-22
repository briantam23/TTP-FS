import React, { Component, Fragment } from 'react';
import style from './signIn.less';


class SignIn extends Component {
    render() {
        return(
            <div>
                <form>
                    <input 
                        name='email' 
                        placeholder='Email'
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
                </form>
            </div>
        )
    }
}


export default SignIn;