
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./backend/config/db.js";
// import products from './DB/products.js'
import productRoutes from "./backend/routes/productRoutes.js";
import userRoutes from "./backend/routes/userRoutes.js";
import orderRoutes from "./backend/routes/orderRoutes.js";
import { notFound, errorHandler } from "./backend/middleware/errorMid.js";


dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res, next) => {
    res.send("Backend Begins...");
});


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



app.use(notFound);

app.use(errorHandler);


const PORT = process.env.PORT || 8800;
app.listen(8800);