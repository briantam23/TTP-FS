import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './signIn.less';
import { Link } from 'react-router-dom';
import { login, logout } from '../../store/actions/auth';


class SignIn extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    componentDidUpdate = prevProps => {
        const { auth } = this.props;
        if(prevProps !== this.props) {
            if(auth.id) {
                this.setState({ 
                    email: '', 
                    password: '', 
                    error: '' 
                });
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleAuth = e => {
        e.preventDefault();
        const { auth, login, logout, history } = this.props;

        !auth.id ? (
            login(this.state, history)
                .catch(() => {
                    this.setState({
                        email: '',
                        password: '',
                        error: 'Incorrect Email and/or Password.'
                    })
                })
        ) : logout(history)
    }

    handleClearError = () => {
        this.setState({ error: '' });
    }

    render() {
        const { email, password, error } = this.state;
        const { handleChange, handleAuth, handleClearError } = this;
        const { auth, history } = this.props;
        return(
            <div>
            {
                error ? (
                    <div onClick={ () => handleClearError() }>
                        { error }
                    </div>
                ): null
            }
                <form onSubmit={ handleAuth }>
            {   
                !auth.id ? (
                    <Fragment>
                        <input 
                            onChange={ handleChange }
                            value={ email }
                            id='email'
                            placeholder='Email'
                            size='20'
                            required
                            autoFocus
                            />
                        <input 
                            onChange={ handleChange }
                            value={ password }
                            id='password'
                            placeholder='Password'
                            size='20'
                            required
                            type='password'
                            />
                        <button disabled={ !email && !password }>Login</button>
                        <div>
                            <Link to='/create-account'>Create an account</Link>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>Welcome { auth.name }!</div>
                        <button>Logout</button>
                    </Fragment>
                )
            }
                </form>
            </div>
        )
    }
}


const mapStateToProps = ({ auth }, { history }) => ({ auth, history });

const mapDispatchToProps = ({ login, logout });


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);