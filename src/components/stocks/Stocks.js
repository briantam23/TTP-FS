import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './stocks.less';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';


class Stocks extends Component {

    state = {
        symbol: '',
        quantity: 0,
        error: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        const { symbol, quantity, error } = this.state;
        const { handleChange } = this;
        return(
            <div>
                <Fragment>
                    <h2>Stocks</h2>
                    <hr/>
                    <Form>
                        <FormGroup row>
                            <Label for='symbol' sm={2} size='lg'>Symbol</Label>
                            <Col sm={10} className={ style.input }>
                            {
                                !error ? (
                                    <Input 
                                        onChange={ handleChange }
                                        value={ symbol }
                                        type='text'
                                        id='symbol'
                                        placeholder='Symbol'
                                        size='20'
                                        required
                                        />
                                ) : (
                                    <Input 
                                        onChange={ handleChange }
                                        value={ symbol }
                                        type='text'
                                        id='symbol'
                                        placeholder='Symbol'
                                        size='20'
                                        required
                                        />
                                )
                            }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='quantity' sm={2} size='lg'>Quantity</Label>
                            <Col sm={10} className={ style.input }>
                            {
                                !error ? (
                                    <Input 
                                        onChange={ handleChange }
                                        value={ quantity }
                                        type='number'
                                        id='quantity'
                                        placeholder='Quantity'
                                        size='20'
                                        required
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
                        <Button color='primary'>Add To Cart</Button>
                        <hr/>
                        <Link to='/cart' className={ style.cartLink }>
                            <Button color='info'>Proceed to Cart</Button>
                        </Link>
                    </Form>
                </Fragment>
            </div>
        )
    }
}


const mapStateToProps = ({ auth }, { history }) => ({ auth, history });


export default connect(mapStateToProps)(Stocks);