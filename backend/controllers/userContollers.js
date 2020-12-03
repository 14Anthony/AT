
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../../backend/utils/generateToken.js'



// this is going to authorize the user & get a token later.
// this will be the POST to /api/users/login
// this is access for a public routes
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),


        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// this is going to register the new user 
// this will be the POST to /api/users
// this is access for a public routes
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User Exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})
// the is going to Get user Profile
// this will be the POST to /api/users/profile
// this is access for a private route
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// the is going to Update user Profile
// this will be the PUT to /api/users/profile
// this is access for a private route
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name

        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// the is going to Get all the users
// this will be the POST to /api/users
// this is access for a private admin
//admin controller from Travis
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})


// the is going to Delete a user
// this will be the Delete to /api/users/:id
// this is access for a private admin
//admin controller from Travis
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'User Deleted' })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// the is going to Get user by ID
// this will be the POST to /api/users/:id
// this is access for a private admin
//admin controller from Travis
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }

})

// the is going to Update user 
// this will be the PUT to /api/users/:id
// this is access for a private admin route
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {

        user.name = req.body.name || user.name

        user.email = req.body.email || user.email

        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser

}