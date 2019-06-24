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
        const { auth, loadInitialTransactions, history } = this.props;
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
                    .then(() => history.push('/portfolio'))
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleAuth = e => {
        e.preventDefault();
        const { auth, login, logout } = this.props;

        !auth.id ? (
            login(this.state)
                .catch(() => {
                    this.setState({
                        email: '',
                        password: '',
                        error: 'Incorrect Email and/or Password.'
                    })
                })
        ) : logout()
    }

    render() {
        const { email, password, error } = this.state;
        const { handleChange, handleAuth } = this;
        const { auth } = this.props;
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
                                <Col sm={10} className={ style.input }>
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
                                <Col sm={10} className={ style.input }>
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
                                                />
                                            <FormFeedback>{ error }</FormFeedback>
                                        </Fragment>
                                    )
                                }
                                </Col>
                            </FormGroup>
                            <Button disabled={ !email && !password } color='primary'>Login</Button>
                            <hr/>
                            <div>
                                <h4 className={ style.register }>Or</h4>
                                <Link to='/register'>
                                    <Button color='info'>Create an account</Button>
                                </Link>
                            </div>
                        </Form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Form onSubmit={ handleAuth } className={ style.welcome }>
                            <h3>Welcome { auth.name }!</h3>
                            <Button color='danger' className={ style.logOut }>Logout</Button>
                        </Form>
                        <hr/>
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