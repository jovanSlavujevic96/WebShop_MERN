import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, FormControl, Form} from 'react-bootstrap'
import Rating from '../commponents/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../commponents/Loader'
import Message from '../commponents/Message'
import Meta from '../commponents/Meta'
import { productCreateReviewReset } from '../reducers/productReducers'

const ProductScreen = ( {history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview } = productReviewCreate;

    useEffect(() => {
        dispatch(productCreateReviewReset());
        if(successProductReview){
            alert('Review Submitted!');
            setRating(0);
            setComment('');
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
  
    const submitHandler = (e) => {
        e.preventDefault()

        // first - id
        // second - object review with rating and comment
        dispatch( createProductReview(match.params.id, {rating, comment}) );
    }

    return <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>

        {loading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> :
        <>
            <Meta title={product.name}/>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid /> 
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>Price: {product.price}???</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>{product.price}???</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{(product.countInStock > 0) ? 'In Stock' : 'Out Of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>

                        {(product.countInStock > 0) && <ListGroup.Item>
                            <Row>
                                <Col>Quantity</Col>
                                <Col>
                                    <FormControl 
                                        as = 'select' 
                                        value = {qty} 
                                        onChange = {(e) => setQty(e.target.value)}
                                    >
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key = {x + 1} value = {x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </ListGroup.Item>}

                        <ListGroup.Item>
                            <Button 
                                onClick = {addToCartHandler}
                                className='btn-block' 
                                type='button'
                                disabled={(product.countInStock === 0)}
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    { (product.reviews.length === 0) && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        { product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            { errorProductReview && <Message variant='danger'>{errorProductReview}</Message> }
                            { userInfo ?
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId = 'rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as = 'textarea'
                                        row = '3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                            </Form> :
                            <Message>
                                Please <Link to='/login'>sign in</Link> to write a review
                            </Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>} 
    </>;
}

export default ProductScreen;
//fluid kako bi slika bila zadrzana u kontejneru
//[...Array(product.countInStock).keys()] ovaj niz predstavljao kao npr da imamo niz od 5 clana pisalo bi [0,1,2,3,4], predstavlja kolicini Qty in Stock
//key use when i create list.  We ser key to x+1 because array starts with 0 and we wnat 1,2,3..
//inside option for text displays and also be x+1
