import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './register.less';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { createUser } from '../../store/actions/users';


export class Register extends Component {

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
            .then(() => this.setState({ error: '' }))
            .catch(() => this.setState({ error: 'Email is already registered!' }));
    }

    render() {
        const { createUser } = this.props;
        const { handleChange, onSubmit } = this;
        const { name, email, password, error } = this.state;
        return(
            <div>
                <h2>Register</h2>
                <hr/>
                <Form onSubmit={ onSubmit }>
                    <FormGroup row>
                        <Label for='name' sm={2} size='lg'>Name</Label>
                        <Col sm={10}>
                            <Input 
                                onChange={ handleChange }
                                value={ name }
                                type='text'
                                id='name'
                                placeholder='Name'
                                size='20'
                                required
                                autoFocus 
                                />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Fragment>
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
                                    <Fragment>
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
                                        <FormFeedback>{ error }</FormFeedback>
                                    </Fragment>
                                )
                            }
                            </Col>
                        </Fragment>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='password' sm={2} size='lg'>Password</Label>
                        <Col sm={10}>
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
                        </Col>
                    </FormGroup>
                    <Button color='primary'>Create Account</Button>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = { createUser };


export default connect(null, mapDispatchToProps)(Register);