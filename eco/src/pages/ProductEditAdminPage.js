import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, listProductsDetails, } from '../actions/productActions'
// import { USER_UPDATE_RESET } from 

const ProductEditAdminPage = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState(0)
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [rating, setRating] = useState('')
    const [numReviews, setNumReviews] = useState(0)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    // const userUpdate = useSelector(state => state.userUpdate)
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setCountInStock(product.countInStock)
            setRating(product.rating)
            setNumReviews(product.numReviews)
        }
    }, [product, dispatch, productId, product, history])

    const submitHandler = (e) => {
        e.preventDefault()
        //UPDATE PRODUCT


    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-primary my-3'>Back</Link>
            <FormContainer>
                <h2>EDIT PRODUCT</h2>
                {/* {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='warning'>{errorUpdate}</Message>} */}
                {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>NAME:</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>PRICE:</Form.Label>
                            <Form.Control type='Number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Image Url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>BRAND:</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>DESCRIPTION:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>COUNT IN STOCK:</Form.Label>
                            <Form.Control type='Number' placeholder='Enter CountInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='rating'>
                            <Form.Label>RATING:</Form.Label>
                            <Form.Control type='Number' placeholder='Enter Rating' value={rating} onChange={(e) => setRating(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='numReviews'>
                            <Form.Label>NUMBER OF REVIEWS:</Form.Label>
                            <Form.Control type='Number' placeholder='Enter NumReviews' value={numReviews} onChange={(e) => setNumReviews(e.target.value)}></Form.Control>
                        </Form.Group>



                        <Button type='submit' variant="info">UPDATE</Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default ProductEditAdminPage