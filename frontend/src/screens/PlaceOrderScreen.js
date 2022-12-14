import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'

// components
import Message from '../commponents/Message'
import ChechoutSteps from '../commponents/ChechoutSteps'
import Loader from '../commponents/Loader'

// actions
import { createOrder } from '../actions/orderActions';
import { orderCreateReset } from '../reducers/orderReducers';

const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch();

    //grab the items from our cart
    const cart = useSelector(state => state.cart);

    //calculate prices
    const addDecimals = (num) => {
       return (Math.round(num * 100) / 100).toFixed(2)
    } 

    const itemsPrice = addDecimals(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    ));
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, error } = orderCreate;

    useEffect(() => {
        dispatch(orderCreateReset());
    }, [dispatch]);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }, history))
    }

    return <>
        <ChechoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},
                            {cart.shippingAddress.city},
                            {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> :
                        (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key = {index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price}??? = {item.qty * item.price}???
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>{itemsPrice}???</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{shippingPrice}???</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{taxPrice}???</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>{totalPrice}???</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            { loading ?
                            <Loader/> :
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button> }
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>;
}

export default PlaceOrderScreen
