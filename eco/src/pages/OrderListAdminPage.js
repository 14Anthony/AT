import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'


const OrderListAdminPage = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        <>
            <h2>ORDERS</h2>
            {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL </th>
                                <th>PAID</th>
                                <th>DELIVERED</th>


                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>

                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)) : (<i className='fas fa-search-dollar'></i>)}
                                    </td>
                                    {/* // <i className='fas fa-money-check-alt' style={{ color: 'green' }}></i>) : */}

                                    <td>
                                        <td>{order.isDeliverd ? (
                                            order.deliveredAt.substring(0, 10)) : (<i className='fas fa-truck-moving' style={{ color: 'info' }}></i>)}
                                        </td>
                                        {/* // <i className='fas fa-money-check-alt' style={{ color: 'green' }}></i>) : */}

                                        <td>
                                            <LinkContainer to={`/order/${order._id}/edit`}>
                                                <Button variant='info' className='btn-sm ml-auto'>
                                                    <i className='fas fa-asterisk'>Details</i>
                                                </Button>
                                            </LinkContainer>



                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default OrderListAdminPage