import path from 'path'
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
// import products from './DB/products.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMid.js";


dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/eco/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'eco', 'build', 'index.html')))
} else
    app.get("/", (req, res, next) => {
        res.send("Backend Begins...");
    });

app.use(notFound);

app.use(errorHandler);


const PORT = process.env.PORT || 8800;
app.listen(8800);