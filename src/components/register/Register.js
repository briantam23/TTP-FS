import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './register.less';
import { createUser } from '../../store/actions/users';


class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        error: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        const { createUser } = this.props;
        const { name, email, password } = this.state;
        e.preventDefault();
        createUser({ name, email, password })
            .catch(() => this.setState({ error: 'Error! Email taken. Please try again.'}));
    }

    render() {
        const { createUser } = this.props;
        const { handleChange, onSubmit } = this;
        const { name, email, password, error } = this.state;
        return(
            <div>
                { error ? <div className='error-message'>{ error }</div> : null }
                <form onSubmit={ onSubmit }>
                    <input 
                        onChange={ handleChange }
                        value={ name }
                        id='name'
                        placeholder='Name'
                        size='20'
                        required
                        autoFocus 
                        />
                    <input 
                        onChange={ handleChange }
                        value={ email }
                        id='email'
                        placeholder='Email'
                        size='20'
                        required
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
                    <button>Create Account</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = { createUser };


export default connect(null, mapDispatchToProps)(Register);