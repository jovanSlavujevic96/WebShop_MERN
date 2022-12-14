import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import { listOrders, deleteOrder } from '../actions/orderActions';


const OrderListScreen = ({ history} ) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    //because we want the user who does't admin block to see this page, if else down
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin ) {
            dispatch(listOrders())
        } else {
            //redirect to login
            history.push('/login')
        }
       
    }, [dispatch, history, userInfo]);

    const cancelHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteOrder(id, listOrders))
        }
    }

    return <>
        <h1>Orders</h1>
        { loading ?
        <Loader /> : error ?
        <Message variant='danger'>{error}</Message> :
        <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user ? order.user.name : "unknown user"}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}???</td>
                        <td>
                            { order.isPaid ?
                            <span>{order.paidAt.substring(0, 10)}</span> :
                            <i className='fas fa-times' style={{ color: 'red' }}></i> }
                        </td>
                        <td>
                            { order.isDelivered ?
                            <span>{order.deliveredAt.substring(0, 10)}</span> :
                            <i className='fas fa-times' style={{ color: 'red' }}></i> }
                        </td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                        </td>
                        <td>
                            <Button
                                className='btn-sm'
                                variant='warning'
                                disabled={order.isPaid}
                                onClick={() => cancelHandler(order._id)}
                            >
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )) }
            </tbody>
        </Table> }
    </>;
}

export default OrderListScreen;
