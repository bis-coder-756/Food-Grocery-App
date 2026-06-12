import express from 'express';
import authUser from '../Middlewares/authUser.js';
import { updatecart } from '../Controllers/CartController.js';

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updatecart)

export default cartRouter;