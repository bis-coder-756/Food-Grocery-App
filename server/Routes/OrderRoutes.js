import express from 'express'
import authUser from '../Middlewares/authUser.js'
import authSeller from '../Middlewares/authSeller.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, stripeWebhooks } from '../Controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.post('/stripe',authUser,placeOrderStripe)


orderRouter.get('/user',authUser,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)

export default orderRouter