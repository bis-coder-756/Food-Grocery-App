import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './Configs/db.js';
import 'dotenv/config';
import userRouter from './Routes/UserRoute.js';
import sellerRouter from './Routes/SellerRoutes.js';
import connectCloudinary from './Configs/Cloudinary.js';
import productRouter from './Routes/ProductRoutes.js';
import cartRouter from './Routes/CartRoutes.js';
import addressRouter from './Routes/AddressRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
import ContactRouter from './Routes/ContactRoutes.js';
import { stripeWebhooks } from './Controllers/OrderController.js';



const app= express();
const PORT = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();


// Allow multiple origins
const allowedOrigins = ['http://localhost:5173',process.env.CLIENT_URL]

// stripe webhook 
app.post('/stripe', express.raw({type: "application/json"}),stripeWebhooks )
// middleware configration
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.use(cors({origin : allowedOrigins , credentials : true}))




// middleware configration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins , credentials : true}))


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);
app.use("/api/contact", ContactRouter);


// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
  message: err.message || 'Internal Server Error'
  });
});


export default app;


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

