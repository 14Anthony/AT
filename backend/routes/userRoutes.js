import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../../backend/controllers/userContollers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
// import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'

const router = express.Router();

// the is going to grab all of the users
// this will be the GET to /api/products
// this is access for a public routes
//admin get to the '/' route from Travis

router.route("/")
  .post(registerUser)
  .get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
