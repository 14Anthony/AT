
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
// import products from './DB/products.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMid.js";


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





app.use(notFound);

app.use(errorHandler);


const PORT = process.env.PORT || 8800;
app.listen(8800);