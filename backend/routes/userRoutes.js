import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } from '../../backend/controllers/userContollers.js'
import { protect } from '../middleware/authMiddleware.js'
// import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'

const router = express.Router()


// the is going to grab all of the students
// this will be the GET to /api/products
// this is access for a public routes

router.route('/').post(registerUser).get(protect, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)



export default router