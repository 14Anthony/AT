
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



// the is going to grab all of the students
// this will be the GET to /api/products
// this is access for a public routes
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})
// the is going to grab single student
//  GET to /api/products/:id
// this is access for a public routes
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {

        res.json(product)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
// the is going to Delet a product
//  DELETE to /api/products/:id
// this is access for a Private admin routes
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {

        await product.remove()
        res.json({ message: 'Product Deleted' })

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
// the is going to create a product
//  POST to /api/products
// this is access for a Private Admin  routes
const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    // const product = new Product({
    //     name: 'New Name',
    //     price: 0,
    //     user: req.user._id,
    //     image: '/images/sample.jpg',
    //     brand: 'New Brand',
    //     category: 'New Category',
    //     countInStock: 0,
    //     numReviews: 0,
    //     description: 'New Description',
    //     rating: 5
    // })
    // const createdProduct = await product.save()
    // res.status(201).json(createdProduct)
})
// the is going to UPDATE a product
//  PUT to /api/products/:id
// this is access for a Private Admin  routes
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock, rating } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.rating = rating

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')

    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}