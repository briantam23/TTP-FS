import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './signIn.less';
import { Link } from 'react-router-dom';
import { login, logout } from '../../store/actions/auth';
import { loadInitialTransactions } from '../../store/actions/transactions';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';


export class SignIn extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    componentDidUpdate = prevProps => {
        const { auth, loadInitialTransactions } = this.props;
        if(prevProps !== this.props) {
            if(auth.id) {
                loadInitialTransactions(auth.id)
                    .then(() => {
                        this.setState({ 
                            email: '', 
                            password: '', 
                            error: '' 
                        });
                    })
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

    render() {
        const { email, password, error } = this.state;
        const { handleChange, handleAuth } = this;
        const { auth, history } = this.props;
        return(
            <div>
            {   
                !auth.id ? (
                    <Fragment>
                        <h2>Sign In</h2>
                        <hr/>
                        <Form onSubmit={ handleAuth }>
                            <FormGroup row>
                                <Label for='email' sm={2} size='lg'>Email</Label>
                                <Col sm={10}>
                                {
                                    !error ? (
                                        <Input 
                                            onChange={ handleChange }
                                            value={ email }
                                            type='email'
                                            id='email'
                                            placeholder='Email'
                                            size='20'
                                            required
                                            />
                                    ) : (
                                        <Input 
                                            invalid
                                            onChange={ handleChange }
                                            value={ email }
                                            type='email'
                                            id='email'
                                            placeholder='Email'
                                            size='20'
                                            required
                                            />
                                    )
                                }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='password' sm={2} size='lg'>Password</Label>
                                <Col sm={10}>
                                {
                                    !error ? (
                                        <Input 
                                            onChange={ handleChange }
                                            value={ password }
                                            type='password'
                                            id='password'
                                            placeholder='Password'
                                            size='20'
                                            required
                                            type='password'
                                            />
                                    ) : (
                                        <Fragment>
                                            <Input 
                                                invalid
                                                onChange={ handleChange }
                                                value={ password }
                                                type='password'
                                                id='password'
                                                placeholder='Password'
                                                size='20'
                                                required
                                                type='password'
                                                />
                                            <FormFeedback>{ error }</FormFeedback>
                                        </Fragment>
                                    )
                                }
                                    
                                </Col>
                            </FormGroup>
                            <Button disabled={ !email && !password } color='primary'>Login</Button>
                            <div>
                                <Link to='/create-account'>Create an account</Link>
                            </div>
                        </Form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Form onSubmit={ handleAuth }>
                            <div>Welcome { auth.name }!</div>
                            <Button color='danger'>Logout</Button>
                        </Form>
                    </Fragment>
                )
            }
            </div>
        )
    }
}


const mapStateToProps = ({ auth }, { history }) => ({ auth, history });

const mapDispatchToProps = ({ login, logout, loadInitialTransactions });


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);