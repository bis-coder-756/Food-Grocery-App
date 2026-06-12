import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../Controllers/Sellercontroller.js';
import authSeller from '../Middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerLogin);
// in this we have to add the middleware to authenticate the seller before checking is-auth
sellerRouter.get('/is-auth', authSeller , isSellerAuth);
sellerRouter.get('/logout',sellerLogout);

// after creating this API endpoints next we have to export this sellerRouter from here 
export default sellerRouter;

// now we can use this sellerRouter in our main server file (server.js)