import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './stocks.less';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { isNaturalNumber } from '../../util';


class Stocks extends Component {

    state = {
        symbol: '',
        quantity: 0,
        symbolError: '',
        quantityError: ''
    }

    handleChange = e => {
        const { quantityError } = this.state;
        const { id, value } = e.target;
        
        if(id === 'quantity' && !isNaturalNumber(value)) {
            this.setState({ quantityError: 'Invalid Quantity' });
        }
        else if(quantityError && id === 'quantity' && isNaturalNumber(value)) {
            this.setState({ quantityError: '' });
        }
        this.setState({ [id]: value });
    }

    render() {
        const { symbol, quantity, symbolError, quantityError } = this.state;
        const { handleChange } = this;
        return(
            <div>
                <Fragment>
                    <h2>Buy Stocks</h2>
                    <hr/>
                    <Form>
                        <FormGroup row>
                            <Label for='symbol' sm={2} size='lg'>Symbol</Label>
                            <Col sm={10} className={ style.input }>
                            {
                                !symbolError ? (
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
                                    <Fragment>
                                        <Input 
                                            invalid
                                            onChange={ handleChange }
                                            value={ symbol }
                                            type='text'
                                            id='symbol'
                                            placeholder='Symbol'
                                            size='20'
                                            required
                                            />
                                            <FormFeedback>{ symbolError }</FormFeedback>
                                    </Fragment>
                                )
                            }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='quantity' sm={2} size='lg'>Quantity</Label>
                            <Col sm={10} className={ style.input }>
                            {
                                !quantityError ? (
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
                                            value={ quantity }
                                            type='number'
                                            id='quantity'
                                            placeholder='Quantity'
                                            size='20'
                                            required
                                            />
                                        <FormFeedback>{ quantityError }</FormFeedback>
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