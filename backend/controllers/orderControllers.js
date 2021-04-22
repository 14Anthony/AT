import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// the is going to create a new order made
// this will be the Post to /api/orders
// this is access for a protected routes
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
// the is going to get the new order made by id.
// this will be the get to /api/orders/:id
// this is access for a private routes
const getOrderById = asyncHandler(async (req, res) => {
  const order = await (await Order.findById(req.params.id)).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// the is going to update order to paid
// this will be the get to /api/orders/:id/pay
// this is access for a private routes
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// the is going to GET logged in user orders
// this will be the get to /api/orders/myorders
// this is access for a private routes
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
